CREATE TABLE IF NOT EXISTS `Organizations` (`id` BIGINT auto_increment , `billingAddress` TEXT NOT NULL, `country` VARCHAR(50) NOT NULL, `billingIdentifier` VARCHAR(255) NOT NULL, `name` VARCHAR(255) NOT NULL, PRIMARY KEY (`id`));
CREATE TABLE IF NOT EXISTS `Hotels` (`id` BIGINT auto_increment , `name` VARCHAR(255) NOT NULL, `contactEmail` VARCHAR(255), `primaryContactPhone` VARCHAR(30), `secondaryContactPhone` VARCHAR(30), `checkinTime` TIME, `checkoutTime` TIME, `stars` INTEGER, `category` ENUM('HOTEL', 'APART', 'HOSTEL', 'OTHER'), `country` VARCHAR(50) NOT NULL, `city` VARCHAR(50) NOT NULL, `address` TEXT NOT NULL, `organizationId` BIGINT NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`organizationId`) REFERENCES `Organizations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE);
CREATE TABLE IF NOT EXISTS `Amenities` (`id` BIGINT auto_increment , `code` VARCHAR(10), `description` TEXT NOT NULL, PRIMARY KEY (`id`));
CREATE TABLE IF NOT EXISTS `HotelAmenities` (`hotelId` BIGINT , `amenityId` BIGINT , PRIMARY KEY (`hotelId`, `amenityId`), FOREIGN KEY (`hotelId`) REFERENCES `Hotels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`amenityId`) REFERENCES `Amenities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE);
CREATE TABLE IF NOT EXISTS `HotelImages` (`id` INTEGER NOT NULL auto_increment , `hotelId` BIGINT, `path` VARCHAR(255) NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`hotelId`) REFERENCES `Hotels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE);
CREATE TABLE IF NOT EXISTS `MealPlans` (`id` BIGINT auto_increment , `name` VARCHAR(255) NOT NULL, `description` TEXT NOT NULL, `code` VARCHAR(2) NOT NULL, PRIMARY KEY (`id`));
CREATE TABLE IF NOT EXISTS `MealPlanHotels` (`hotelId` BIGINT , `mealPlanId` BIGINT , PRIMARY KEY (`hotelId`, `mealPlanId`), FOREIGN KEY (`hotelId`) REFERENCES `Hotels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`mealPlanId`) REFERENCES `MealPlans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE);
CREATE TABLE IF NOT EXISTS `Rooms` (`id` BIGINT auto_increment , `type` ENUM('SINGLE', 'DOUBLE', 'TRIPLE', 'QUAD', 'QUEEN', 'KING', 'DOUBLE_DOUBLE', 'STUDIO', 'SUITE', 'MASTER_SUITE', 'JUNIOR_SUITE') NOT NULL, `maxOcupancy` INTEGER, `surfaceArea` DOUBLE PRECISION, `guests` INTEGER, PRIMARY KEY (`id`));
CREATE TABLE IF NOT EXISTS `RoomAmenities` (`roomId` BIGINT , `amenityId` BIGINT , PRIMARY KEY (`roomId`, `amenityId`), FOREIGN KEY (`roomId`) REFERENCES `Rooms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`amenityId`) REFERENCES `Amenities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE);
CREATE TABLE IF NOT EXISTS `Beds` (`id` BIGINT auto_increment , `name` VARCHAR(100) NOT NULL, `code` VARCHAR(10) NOT NULL, PRIMARY KEY (`id`));
CREATE TABLE IF NOT EXISTS `RoomBeds` (`roomId` BIGINT , `bedId` BIGINT , PRIMARY KEY (`roomId`, `bedId`), FOREIGN KEY (`roomId`) REFERENCES `Rooms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`bedId`) REFERENCES `Beds` (`id`) ON DELETE CASCADE ON UPDATE CASCADE);
CREATE TABLE IF NOT EXISTS `RoomHotels` (`hotelId` BIGINT , `roomId` BIGINT , PRIMARY KEY (`hotelId`, `roomId`), FOREIGN KEY (`hotelId`) REFERENCES `Hotels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`roomId`) REFERENCES `Rooms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE);
CREATE TABLE IF NOT EXISTS `Users` (`id` BIGINT auto_increment , `username` VARCHAR(20) NOT NULL UNIQUE, `password` VARCHAR(255) NOT NULL, `email` VARCHAR(255) NOT NULL, `organizationId` BIGINT, PRIMARY KEY (`id`), FOREIGN KEY (`organizationId`) REFERENCES `Organizations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE);
CREATE TABLE IF NOT EXISTS `Roles` (`id` BIGINT auto_increment , `role_name` VARCHAR(50) NOT NULL, PRIMARY KEY (`id`));
CREATE TABLE IF NOT EXISTS `UserRoles` (`userId` BIGINT , `roleId` BIGINT , PRIMARY KEY (`userId`, `roleId`), FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`roleId`) REFERENCES `Roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE);
CREATE TABLE IF NOT EXISTS `Reservations` (`id` INTEGER NOT NULL auto_increment , `from` DATETIME NOT NULL, `until` DATETIME NOT NULL, `roomId` BIGINT, `mealPlanId` BIGINT, `userId` BIGINT, PRIMARY KEY (`id`), FOREIGN KEY (`roomId`) REFERENCES `Rooms` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE, FOREIGN KEY (`mealPlanId`) REFERENCES `MealPlans` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE, FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE);