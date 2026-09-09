-- ===================================================================
-- Life Care — add the HOSPITAL (limited-access) admin user.
-- Use this on an EXISTING database (it does NOT drop/wipe any tables).
-- Import in phpMyAdmin, or run directly. Change the password after login.
--   username: hospital   password: lifecare@hospital
--   role: hospital  → Dashboard, Doctors, Blog Posts, Enquiries, Site Settings
-- ===================================================================

INSERT INTO `admins` (`username`, `email`, `password_hash`, `name`, `role`)
VALUES ('hospital', 'info@lifecarebhatkal.com', '$2y$12$Mvyov87Bg0bE9Og3TbOeiOQuMEt523v.y1hOQvr2hbvTgnxVzVM8m', 'Hospital Administrator', 'hospital')
ON DUPLICATE KEY UPDATE `role` = 'hospital', `name` = 'Hospital Administrator';
