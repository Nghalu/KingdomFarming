-- KingdomFarming Lesotho Database Schema
-- This schema includes commission tracking and farmer payout management

-- Users table (farmers, consumers, admin)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('farmer', 'consumer', 'admin')),
    district VARCHAR(100),
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Farms table
CREATE TABLE farms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farmer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    district VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    whatsapp VARCHAR(20),
    description TEXT,
    practices TEXT[], -- Array of farming practices
    images TEXT[], -- Array of image URLs
    verified BOOLEAN DEFAULT FALSE,
    rating DECIMAL(3,2) DEFAULT 0.0,
    total_reviews INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farmer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    farm_id UUID NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL CHECK (category IN ( 'vegetables','fruits','grains', 'poultry','livestock','meats','dairy','seedlings','fertilizers','herbs';)),
    price DECIMAL(10,2) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    images TEXT[] NOT NULL,
    in_stock BOOLEAN DEFAULT TRUE,
    quantity INTEGER DEFAULT 0,
    organic BOOLEAN DEFAULT FALSE,
    featured BOOLEAN DEFAULT FALSE,
    rating DECIMAL(3,2) DEFAULT 0.0,
    total_reviews INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    consumer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    subtotal DECIMAL(10,2) NOT NULL, -- Total before commission
    commission DECIMAL(10,2) NOT NULL, -- 10% platform commission
    delivery_fee DECIMAL(10,2) DEFAULT 0,
    total DECIMAL(10,2) NOT NULL, -- subtotal + delivery_fee (commission included in subtotal)
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
    delivery_option VARCHAR(20) NOT NULL CHECK (delivery_option IN ('pickup-farm', 'pickup-point', 'delivery')),
    delivery_address TEXT,
    pickup_location TEXT,
    payment_method VARCHAR(20) NOT NULL CHECK (payment_method IN ('ecocash', 'mpesa', 'visa','mastercard')),
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
    payment_phone VARCHAR(20),
    transaction_id VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items table
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    farmer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL, -- Price at time of order
    subtotal DECIMAL(10,2) NOT NULL, -- quantity * price
    farmer_earnings DECIMAL(10,2) NOT NULL, -- 90% of subtotal
    commission DECIMAL(10,2) NOT NULL, -- 10% of subtotal
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Farmer payouts table (tracks payments to farmers)
CREATE TABLE farmer_payouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    farmer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL, -- Total farmer earnings from this order
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'paid', 'failed')),
    payment_method VARCHAR(20) CHECK (payment_method IN ('ecocash', 'mpesa', 'visa','mastercard')),
    payment_phone VARCHAR(20),
    transaction_id VARCHAR(255),
    paid_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Commission tracking table
CREATE TABLE commissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'collected')),
    collected_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews table
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    consumer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    farmer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    verified BOOLEAN DEFAULT FALSE, -- TRUE if consumer actually bought from farmer
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'order', 'payment', 'review', 'system'
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_farms_farmer_id ON farms(farmer_id);
CREATE INDEX idx_farms_district ON farms(district);
CREATE INDEX idx_products_farmer_id ON products(farmer_id);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_orders_consumer_id ON orders(consumer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_farmer_id ON order_items(farmer_id);
CREATE INDEX idx_farmer_payouts_farmer_id ON farmer_payouts(farmer_id);
CREATE INDEX idx_farmer_payouts_status ON farmer_payouts(status);
CREATE INDEX idx_commissions_order_id ON commissions(order_id);
CREATE INDEX idx_reviews_farmer_id ON reviews(farmer_id);
CREATE INDEX idx_reviews_product_id ON reviews(product_id);

-- Triggers to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_farms_updated_at BEFORE UPDATE ON farms FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_farmer_payouts_updated_at BEFORE UPDATE ON farmer_payouts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate and create order items with commission
CREATE OR REPLACE FUNCTION create_order_items(
    p_order_id UUID,
    p_items JSONB
) RETURNS VOID AS $$
DECLARE
    item JSONB;
    product_record RECORD;
    item_subtotal DECIMAL(10,2);
    item_commission DECIMAL(10,2);
    item_farmer_earnings DECIMAL(10,2);
BEGIN
    FOR item IN SELECT * FROM jsonb_array_elements(p_items)
    LOOP
        -- Get product details
        SELECT * INTO product_record FROM products WHERE id = (item->>'product_id')::UUID;
        
        -- Calculate amounts
        item_subtotal := (item->>'quantity')::INTEGER * product_record.price;
        item_commission := ROUND(item_subtotal * 0.10, 2); -- 10% commission
        item_farmer_earnings := item_subtotal - item_commission; -- 90% to farmer
        
        -- Insert order item
        INSERT INTO order_items (
            order_id, product_id, farmer_id, quantity, price, 
            subtotal, farmer_earnings, commission
        ) VALUES (
            p_order_id, 
            (item->>'product_id')::UUID,
            product_record.farmer_id,
            (item->>'quantity')::INTEGER,
            product_record.price,
            item_subtotal,
            item_farmer_earnings,
            item_commission
        );
        
        -- Create commission record
        INSERT INTO commissions (order_id, amount) VALUES (p_order_id, item_commission);
        
        -- Create farmer payout record
        INSERT INTO farmer_payouts (order_id, farmer_id, amount) 
        VALUES (p_order_id, product_record.farmer_id, item_farmer_earnings)
        ON CONFLICT DO NOTHING; -- Avoid duplicates if multiple items from same farmer
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Sample data for testing
INSERT INTO users (name, email, password_hash, phone, role, district, is_verified) VALUES
('Tlotli', 'farmer@test.com', '$2b$10$hash', '+26658123456', 'farmer', 'Maseru', TRUE),
('Deekay', 'consumer@test.com', '$2b$10$hash', '+26658234567', 'consumer', 'Maseru', TRUE),
('Admin User', 'lehloenyamakhala@gmail.com', '$10Bil', '+26656539062', 'admin', 'Maseru', TRUE);