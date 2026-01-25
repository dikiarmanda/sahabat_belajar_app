-- Database: Sistem Informasi Komunitas Sahabat Belajar
-- PostgreSQL Version: 14+ (Supabase Compatible)

-- ====================================
-- TABEL USER MANAGEMENT
-- ====================================

-- Tabel Role/Peran User
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Tabel User
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    role_id INT REFERENCES roles(id) ON DELETE SET NULL,
    profile_photo VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ====================================
-- TABEL ARTIKEL
-- ====================================

-- Tabel Kategori Artikel
CREATE TABLE article_categories (
    id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Artikel
CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image VARCHAR(255),
    author_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category_id INT REFERENCES article_categories(id) ON DELETE SET NULL,
    status VARCHAR(20) CHECK (status IN ('draft', 'published', 'archived')) DEFAULT 'draft',
    views INT DEFAULT 0,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Tags Artikel
CREATE TABLE article_tags (
    id SERIAL PRIMARY KEY,
    tag_name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Relasi Artikel-Tags (Many-to-Many)
CREATE TABLE article_tag_relations (
    article_id INT REFERENCES articles(id) ON DELETE CASCADE,
    tag_id INT REFERENCES article_tags(id) ON DELETE CASCADE,
    PRIMARY KEY (article_id, tag_id)
);

-- ====================================
-- TABEL EVENT
-- ====================================

-- Tabel Event
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    event_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    location VARCHAR(255),
    max_participants INT,
    registration_fee DECIMAL(15,2) DEFAULT 0,
    poster_image VARCHAR(255),
    organizer_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(20) CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')) DEFAULT 'upcoming',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Pendaftaran Event
CREATE TABLE event_registrations (
    id SERIAL PRIMARY KEY,
    event_id INT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    registration_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    payment_status VARCHAR(20) CHECK (payment_status IN ('pending', 'paid', 'cancelled')) DEFAULT 'pending',
    payment_date TIMESTAMPTZ,
    attendance_status VARCHAR(20) CHECK (attendance_status IN ('registered', 'attended', 'absent')) DEFAULT 'registered',
    notes TEXT,
    UNIQUE (event_id, user_id)
);

-- ====================================
-- SISTEM AKUNTANSI
-- ====================================

-- Tabel Akun/Perkiraan (Chart of Accounts)
CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    account_code VARCHAR(20) NOT NULL UNIQUE,
    account_name VARCHAR(100) NOT NULL,
    account_type VARCHAR(20) CHECK (account_type IN ('asset', 'liability', 'equity', 'revenue', 'expense')) NOT NULL,
    parent_id INT REFERENCES accounts(id) ON DELETE SET NULL,
    normal_balance VARCHAR(10) CHECK (normal_balance IN ('debit', 'credit')) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Jurnal Umum
CREATE TABLE general_journals (
    id SERIAL PRIMARY KEY,
    journal_number VARCHAR(50) NOT NULL UNIQUE,
    transaction_date DATE NOT NULL,
    description TEXT NOT NULL,
    reference VARCHAR(100),
    created_by INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    is_posted BOOLEAN DEFAULT FALSE,
    is_reversed BOOLEAN DEFAULT FALSE,
    reversed_journal_id INT REFERENCES general_journals(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Detail Jurnal
CREATE TABLE journal_details (
    id SERIAL PRIMARY KEY,
    journal_id INT NOT NULL REFERENCES general_journals(id) ON DELETE CASCADE,
    account_id INT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    debit DECIMAL(15,2) DEFAULT 0,
    credit DECIMAL(15,2) DEFAULT 0,
    description TEXT
);

-- Tabel Buku Besar (Ledger)
CREATE TABLE ledgers (
    id SERIAL PRIMARY KEY,
    account_id INT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    journal_detail_id INT NOT NULL REFERENCES journal_details(id) ON DELETE CASCADE,
    transaction_date DATE NOT NULL,
    description TEXT,
    debit DECIMAL(15,2) DEFAULT 0,
    credit DECIMAL(15,2) DEFAULT 0,
    balance DECIMAL(15,2) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Periode Akuntansi
CREATE TABLE accounting_periods (
    id SERIAL PRIMARY KEY,
    period_name VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_closed BOOLEAN DEFAULT FALSE,
    closed_at TIMESTAMPTZ,
    closed_by INT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ====================================
-- INSERT DATA AWAL
-- ====================================

-- Insert Default Roles
INSERT INTO roles (role_name, description) VALUES
('Admin', 'Administrator dengan akses penuh'),
('Editor', 'Dapat mengelola artikel dan konten'),
('Member', 'Anggota komunitas biasa'),
('Accountant', 'Mengelola akuntansi dan keuangan');

-- Insert Default Accounts (Contoh Chart of Accounts)
INSERT INTO accounts (account_code, account_name, account_type, normal_balance, description) VALUES
-- ASET
('1-1000', 'Kas', 'asset', 'debit', 'Uang tunai'),
('1-1100', 'Bank', 'asset', 'debit', 'Rekening bank'),
('1-2000', 'Piutang', 'asset', 'debit', 'Piutang usaha'),
('1-3000', 'Perlengkapan', 'asset', 'debit', 'Perlengkapan komunitas'),

-- KEWAJIBAN
('2-1000', 'Utang Usaha', 'liability', 'credit', 'Utang kepada pihak ketiga'),
('2-2000', 'Utang Gaji', 'liability', 'credit', 'Utang gaji karyawan'),

-- EKUITAS
('3-1000', 'Modal', 'equity', 'credit', 'Modal awal komunitas'),
('3-2000', 'Laba Ditahan', 'equity', 'credit', 'Akumulasi laba'),

-- PENDAPATAN
('4-1000', 'Pendapatan Event', 'revenue', 'credit', 'Pendapatan dari event'),
('4-2000', 'Donasi', 'revenue', 'credit', 'Pendapatan donasi'),
('4-3000', 'Iuran Anggota', 'revenue', 'credit', 'Iuran bulanan anggota'),

-- BEBAN
('5-1000', 'Beban Operasional', 'expense', 'debit', 'Beban operasional komunitas'),
('5-2000', 'Beban Gaji', 'expense', 'debit', 'Beban gaji pengurus'),
('5-3000', 'Beban Konsumsi', 'expense', 'debit', 'Beban konsumsi event');

-- ====================================
-- INDEXES UNTUK OPTIMASI
-- ====================================

CREATE INDEX idx_articles_author ON articles(author_id);
CREATE INDEX idx_articles_category ON articles(category_id);
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_slug ON events(slug);
CREATE INDEX idx_journal_date ON general_journals(transaction_date);
CREATE INDEX idx_journal_posted ON general_journals(is_posted);
CREATE INDEX idx_ledger_account ON ledgers(account_id);
CREATE INDEX idx_ledger_date ON ledgers(transaction_date);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);

-- ====================================
-- ROW LEVEL SECURITY (SUPABASE FEATURE)
-- ====================================

-- Enable RLS pada tabel-tabel sensitif
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE general_journals ENABLE ROW LEVEL SECURITY;

-- ====================================
-- CONTOH PENGGUNAAN
-- ====================================

-- Contoh 1: Membuat jurnal baru
/*
-- 1. Generate nomor jurnal
SELECT generate_journal_number(CURRENT_DATE); -- Output: JU/2026/01/0001

-- 2. Insert jurnal header
INSERT INTO general_journals (journal_number, transaction_date, description, created_by)
VALUES ('JU/2026/01/0001', '2026-01-18', 'Penerimaan iuran anggota', 1);

-- 3. Insert jurnal detail (Debit Kas, Credit Iuran)
INSERT INTO journal_details (journal_id, account_id, debit, credit, description) VALUES
(1, 1, 500000, 0, 'Penerimaan kas dari iuran'),
(1, 11, 0, 500000, 'Iuran anggota bulan Januari');

-- 4. Validasi balance
SELECT validate_journal_balance(1); -- Harus return TRUE

-- 5. Post ke ledger
SELECT post_journal_to_ledger(1);
*/

-- Contoh 2: Membuat jurnal pembalik
/*
SELECT create_reversing_journal(1); -- Returns ID jurnal pembalik yang baru
*/

-- Contoh 3: Query laporan
/*
-- Neraca Saldo
SELECT * FROM trial_balance;

-- Laba Rugi
SELECT * FROM income_statement;

-- Posisi Keuangan
SELECT * FROM balance_sheet;

-- Summary Event
SELECT * FROM event_summary WHERE event_date >= CURRENT_DATE;
*/