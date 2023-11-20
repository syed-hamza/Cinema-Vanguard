drop database if exists `cinema`;
CREATE DATABASE IF NOT EXISTS `cinema`;
use `cinema`;




    create table `actor`(
    `actor_id` varchar(10)  not null,
    `f_name` char(15) not null,
    `l_name` char(15) not null,
    `contact_no` varchar(10) not null,
    `ratings` int default null,
    `gender` enum('M','F','O') NOT NULL,
    `dob` date not null,
    `works` varchar(200) default null,
    primary key (`actor_id`));
    
   INSERT INTO `actor` VALUES
('ACT001', 'Shraddha', 'Kapoor', '8491038489', NULL, 'F', '1989-03-03', 'Half-girlfriend, ABCD 2, Ek Villian, Tu Jhooti Me Makkar, Aashiqui 2'),
('ACT002', 'Arjun', 'Kapoor', '9857493847',NULL, 'M', '1985-06-26', 'Half-Girlfriend, Ki and Ka, 2 States, Gunday'),
('ACT003', 'Shahid', 'Kapoor', '9472856372',NULL, 'M', '1981-02-25', 'Haider, Kabir Singh, Shandaar, Jab we met, Vivah'),
('ACT004', 'Tabassum', 'Hashima', '9374827384',NULL, 'F', '1971-11-04', 'Drishyam, Khufiya'),
('ACT005', 'Ajay', 'Devgan', '9329428192', NULL, 'M', '1978-09-26', 'Drishyam, Singham, Golmaal, All the best, Bol Bachhan'),
('ACT006', 'Parineeti', 'Chopra', '8394829384',NULL, 'F', '1988-10-22', 'Hasi Toh Phasi, Girl on the train, meri pyaari bindu, Shuddh Desi Romance'),
('ACT008', 'Sanjay', 'Dutt', '8394728394',NULL, 'M', '1959-07-29', 'Bhoomi, Munna Bhai MBBS, All the best'),
('ACT007','Aditi Rao','Hydari','8738499920',NULL,'F', '1986-10-08','Bhoomi, Girl on the train, Murder 3, Rockstar'),
('ACT009','Alia','Bhatt','9538475928',NULL,'F','1993-03-15','Student of the year, 2 States, Raazi, Gangubai, Brahmastra, Kapoor and sons, Dear Zindagi');



ALTER TABLE `actor` ADD COLUMN `age` INT;

-- Create a procedure to calculate and update the age for all actors
DELIMITER //
CREATE PROCEDURE CalculateAndUpdateAllActorAges()
BEGIN
    DECLARE actorIdVar VARCHAR(10);
    DECLARE done INT DEFAULT FALSE;
    DECLARE cur CURSOR FOR SELECT actor_id FROM actor;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN cur;

    ageCalculation: LOOP
        FETCH cur INTO actorIdVar;
        IF done THEN
            LEAVE ageCalculation;
        END IF;

        -- Calculate age
        UPDATE actor
        SET age = YEAR(CURDATE()) - YEAR(dob)
        WHERE actor_id = actorIdVar;
    END LOOP;

    CLOSE cur;
END;
//
DELIMITER ;
CALL CalculateAndUpdateAllActorAges();



    create table `director` (
    `dir_id` varchar(10) not null,
	`f_name` char(15) not null,
    `l_name` char(15) not null,
    `contact_no` varchar(10) not null,
    `ratings` int default null,
    `gender` enum('M','F','O') NOT NULL,
    `dob` date not null,
    `works` varchar(200) default null,
    primary key (`dir_id`));
    
   INSERT INTO `director` VALUES
('DIR01', 'Mohit', 'Suri', '9302948392', 7.5, 'M', '1981-04-11', 'Aashiqui 2, Awarapan, Ek Villian, Malang, Half-girlfriend'),
('DIR02', 'Vishal', 'Bhardwaj', '9482948392', 6.2, 'M', '1965-08-04', 'Haider, Omkara, Maqubool, 7 Khoon Maaf'),
('DIR03', 'Nishikant', 'Kamat', '9384728374', 8.6, 'M', '1970-06-17', 'Drishyam, Dombivli Fast, Mumbai meri jaan'),
('DIR04', 'Ribhu', 'Dasgupta', '9384750695', 7.9, 'M', '1988-09-23', 'Section 84, Code Name: Tiranga, The Girl On The Train, TE3N'),
('DIR05', 'Omung', 'Kumar', '9583948304', 7.3, 'M', '1970-10-08', 'Bhoomi, Mary Kom, Sarbjit'),
('DIR06','Abhishek','Varma','9374658374',6.8,'M','1987-01-09','2 states, Kalank, Dostana, Paa, Kabhi Alvida Na Kehna');

    
    create table `movie` (
	`mov_id` varchar(10) not null,
    `dir_id` varchar(10) not null,
    `title` varchar(40) not null,
    `genre` char(10) null,
    `duration` int not null,
    `date_of_release` date not null,
    `plot` char(200),
    primary key(`mov_id`,`dir_id`,`date_of_release`),
    CONSTRAINT `fk_dir_movie_id` FOREIGN KEY (`dir_id`) REFERENCES `director` (`dir_id`) ON DELETE CASCADE,
	CONSTRAINT `duration` CHECK ((60 < `duration` < 180)));

INSERT INTO `movie` VALUES
('M001', 'DIR01', 'Half-Girlfriend', 'Romance', 135, '2017-05-19', 'Madhav meets a girl named Riya and falls in love. After struggling to convince her to be his girlfriend, she half-heartedly agrees to be his "Half Girlfriend".'),
('M002', 'DIR02', 'Haider', 'Crime', 160, '2014-10-02', 'A young man returns to Kashmir after his fathers disappearance to confront his uncle, whom he suspects of playing a role in his fathers fate.'),
('M003','DIR03', 'Drishyam', 'Thriller', 143, '2015-07-31', 'Desperate measures are taken by a man who tries to save his family from the dark side of the law after they commit an unexpected crime.'),
('M004','DIR04', 'Girl on the train', 'Suspense', 120, '2021-02-16', 'The story follows a woman who spends her daily commute fantasizing about a seemingly perfect couple who live in a house that her train passes daily, but something shocking happens there one day.'),
('M005','DIR05','Bhoomi','Drama',134,'2020-09-21','A single father battles injustice for his daughter when the perpetrators are found not guilty. Both father and daughter embar on a journey to restore their glory.'),
('M006','DIR06','2 States','Comedy',140,'2014-03-18',' This movie chronicles how Chetan met his wife and the difficulties they faced due to their cultural differences.They decide not to get married until they convince their parents'),
('M007','DIR06','MOVIE','GENRE',120,'2017-08-08','PLOT FOR THE MOVIE');
create table `production_house` (
    `prod_id` varchar(10) not null,
	`prod_name` char(30) not null,
    `p_location` varchar(50) not null,
    `mov_ID` varchar(10) not null,
    primary key(`prod_id`),
    CONSTRAINT `fk_prod_movie_id` FOREIGN KEY (`mov_id`) REFERENCES `movie` (`mov_id`) ON DELETE CASCADE); 
    
    insert into `production_house` values ('P001','Balaji Motion Pictures','123 Main Street Cityville, Fictionland FCT 1234','M001'),
										  ('P002','Vishal Bharadwaj Flims', '120 Main Street Cityville, brgiade FCT 1324','M002'),
                                          ('P003','Panorama Studios','087 Main Street Cityville, mainsvills FCT 1904','M003'),
                                          ('P004','Reliance Entertainment','950 Main Street Cityville, kimberland FCT 1904','M004'),
                                          ('P005','T-Series','950 Main Street taleville, Patangshe FCT 1294','M005'),
                                          ('P006','Dharma Productions','230 Main Street Mangitown, Sheerlake FCT 1302','M006');

    
    create table `crew` (
    `c_id` varchar(10) not null,
    `dir_id` varchar(10) not null,
	`f_name` char(15) not null,
    `l_name` char(15) not null,
    `contact_no` varchar(10) not null,
    `job` varchar(30) default null,
    `salary` int,
    `gender` enum( 'M','F','O'),
    `age` int not null,
    primary key(`c_id`),
    CONSTRAINT `fk_dir_crew_id` FOREIGN KEY (`dir_id`) REFERENCES `director` (`dir_id`) ON DELETE CASCADE,
    CONSTRAINT `age` CHECK ( `age` > 18 ));
    
    INSERT INTO `crew` VALUES
('C001', 'DIR01', 'John', 'Doe', '1234567890', 'Assistant', 45000, 'M', 25),
('C002', 'DIR01', 'Jane', 'Smith', '9876543210', 'Cinematographer', 60000, 'F', 32),
('C003', 'DIR02', 'Michael', 'Johnson', '5555555555', 'Art Director', 55000, 'M', 28),
('C004', 'DIR03', 'Emily', 'Davis', '3333333333', 'Costume Designer', 48000, 'F', 30),
('C005', 'DIR03', 'Robert', 'Williams', '7777777777', 'Editor', 58000, 'M', 35),
('C006', 'DIR04', 'Sarah', 'Brown', '4444444444', 'Makeup Artist', 42000, 'F', 23),
('C007', 'DIR05', 'David', 'Lee', '6666666666', 'Sound Engineer', 62000, 'M', 27);

    
    create table `sponser` (
    `s_id` varchar(10) not null,
    `s_name` varchar(20) not null,
    `contact_no` varchar(10) not null,
    `amount` int not null,
    primary key (`s_id`));
    
    INSERT INTO `sponser` VALUES
('S001', 'XYZ Corporation', '1234567890', 50000),
('S002', 'ABC Enterprises', '9876543210', 75000),
('S003', 'LMN Industries', '5555555555', 60000),
('S004', 'PQR Ltd', '3333333333', 45000),
('S005', 'RST Solutions', '7777777777', 55000);



    
    create table `sponsered_by` (
    `s_id` varchar(10) not null,
    `prod_id` varchar(10) not null,
    primary key(`s_id`,`prod_id`),
    CONSTRAINT `fk_prod_sp_id` FOREIGN KEY (`prod_id`) REFERENCES `production_house` (`prod_id`) ON DELETE CASCADE,
    CONSTRAINT `fk_sp_s_id` FOREIGN KEY (`s_id`) REFERENCES `sponser` (`s_id`) ON DELETE CASCADE);
    
    insert into `sponsered_by` values ('S001','P001'),('S002','P002'),('S003','P003'),('S004','P004'),('S005','P005');
    
    
    create table `rank` (
    `actor_id` varchar(10) not null,
    `singing` int not null,
    `dancing` int not null,
    `fighting` int not null,
    `instrument_playing` int not null,
    `modelling` int not null,
    `porducing` int not null,
    primary key(`actor_id`),
	CONSTRAINT `fk_actor_rank` FOREIGN KEY (`actor_id`) REFERENCES `actor` (`actor_id`) ON DELETE CASCADE);
 
INSERT INTO `rank` VALUES
('ACT001', 8, 7, 9, 6, 7, 6),
('ACT002', 7, 8, 6, 7, 8, 7),
('ACT003', 6, 6, 7, 8, 7, 8),
('ACT004', 9, 7, 8, 6, 6, 7),
('ACT005', 8, 8, 7, 7, 8, 7),
('ACT006', 7, 7, 8, 7, 6, 8),
('ACT007', 8, 6, 7, 8, 7, 7),
('ACT008', 8,7,6,8,6,8),
('ACT009', 7,9,8,6,9,7);

-- aggregate queries
UPDATE actor a
JOIN (
    SELECT actor_id, AVG((singing + dancing + fighting + instrument_playing + modelling + porducing) / 6) AS avg_rank
    FROM `rank`
    GROUP BY actor_id
) r ON a.actor_id = r.actor_id
SET a.ratings = r.avg_rank;

    
    create table `makeup_artist` (
    `artist_id` varchar(10) not null,
    `actor_id` varchar(10) not null,
    `f_name` char(15) not null,
    `l_name` char(15) not null,
    `contact_no` varchar(10) not null,
    `dob` date not null,
    `works` varchar(50),
    primary key(`artist_id`),
	CONSTRAINT `fk_artist_actor` FOREIGN KEY (`actor_id`) REFERENCES `actor` (`actor_id`) ON DELETE CASCADE);
    
    INSERT INTO `makeup_artist` VALUES
('MUA001', 'ACT001', 'Alice', 'Smith', '1234567890', '1990-05-15', 'Film and TV makeup'),
('MUA002', 'ACT002', 'Bob', 'Johnson', '9876543210', '1998-05-28','Theater and fashion makeup'),
('MUA003', 'ACT003', 'Carla', 'Brown', '5555555555', '1995-06-14','Special effects makeup'),
('MUA004', 'ACT004', 'David', 'Lee', '3333333333', '1987-04-30','Bridal and event makeup'),
('MUA005', 'ACT005', 'Ella', 'Wilson', '7777777777','1990-11-23', 'Celebrity and red carpet makeup'),
('MUA006', 'ACT006', 'Frank', 'Taylor', '4444444444','1991-10-08', 'Editorial and runway makeup'),
('MUA007', 'ACT007', 'Grace', 'Martin', '6666666666', '1992-02-01','Theatrical and character makeup');


    create table `designer` (
    `d_id` varchar(10) not null,
    `actor_id` varchar(10) not null,
    `f_name` char(15) not null,
    `l_name` char(15) not null,
    `contact_no` varchar(10) not null,
    `dob` date not null,
    `works` varchar(30),
    `ratings` int default null,
    primary key(`d_id`),
	CONSTRAINT `fk_designer_actor` FOREIGN KEY (`actor_id`) REFERENCES `actor` (`actor_id`) ON DELETE CASCADE);
    
INSERT INTO `designer` VALUES
('D001', 'ACT001', 'Olivia', 'White', '1234567890', '1985-07-20', 'Fashion designing', 8),
('D002', 'ACT002', 'Nathan', 'Clark', '9876543210', '1988-03-12', 'Costume design', 7),
('D003', 'ACT003', 'Sophia', 'Anderson', '5555555555','1980-09-02', 'Theater and stage costumes', 9),
('D004', 'ACT004', 'Liam', 'Harris', '3333333333','1983-08-13', 'Bridal wear', 7),
('D005', 'ACT005', 'Ava', 'Martinez', '7777777777', '1995-09-21','Celebrity styling', 8),
('D006', 'ACT006', 'Mason', 'Garcia', '4444444444', '1993-08-16','Casual and streetwear', 6),
('D007', 'ACT007', 'Zoe', 'Rodriguez', '6666666666', '1990-09-05', 'Red carpet fashion', 7);

    
create table `specialization` (
    `artist_id` varchar(10) not null,
    `specialization` char(40) not null,
    primary key(`artist_id`,`specialization`),
    CONSTRAINT `fk_specailzation` FOREIGN KEY (`artist_id`) REFERENCES `makeup_artist` (`artist_id`) ON DELETE CASCADE);
    
    insert into `specialization` values ('MUA001','Prosthetics makeup'),('MUA002','horror makeup'),('MUA001','bridal makeup'),
                                        ('MUA001','traditional makeup'),('MUA001','90s makeup'),('MUA001','special effects makeup'),
                                        ('MUA001','red carpet makeup');
                                  
CREATE TABLE `theatre` (
    `t_id` varchar(10) not null,
     `mov_id` varchar(20) not null,
    `date_of_release` date not null,
    `t_location` varchar(50) not null,
    `ratings` int default null,
    primary key(`t_id`,`mov_id`,`date_of_release`),
    constraint `fk_mov_theatre` foreign key (`mov_id`) references `movie` (`mov_id`) on delete cascade);
    
DELIMITER //
CREATE TRIGGER `check_date_match`
BEFORE INSERT ON `theatre`
FOR EACH ROW
BEGIN
    DECLARE movie_release_date date;
    SELECT `date_of_release` INTO movie_release_date FROM `movie` WHERE `mov_id` = NEW.`mov_id`;
    
    IF NEW.`date_of_release` != movie_release_date THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Date_of_release in theatre must match date_of_release in movie for the same mov_id';
    END IF;
END;
//
DELIMITER ; 

INSERT INTO `theatre` (`t_id`, `mov_id`, `date_of_release`, `t_location`, `ratings`) VALUES
('T001', 'M001', '2017-05-19', 'Downtown Cinemas', 4),
('T002', 'M002', '2014-10-02', 'CityPlex Theater', 4),
('T003', 'M003', '2015-07-31', 'Starlight Multiplex', 3),
('T004', 'M004', '2021-02-16', 'Sunset Cinema', 3),
('T005', 'M005', '2020-09-21', 'MegaMax Theatres', 4),
('T006','M007','2017-08-08','THEATRE',5);

  
create table `IMDB_website` (
    `web_ip` varchar(20) not null,
    `email_id` varchar(30) not null,
    `contact_no` varchar(10) not null,
    `ratings` int default null,
    `name` varchar(20) not null,
    `mov_id` varchar(10) not null,
    `t_id` varchar(10) not null,
    primary key(`web_ip`,`email_id`,`name`));
   
INSERT INTO `IMDB_website` VALUES
('192.168.1.100', 'info@example.com', '1234567890', 4, 'Downtown Cinemas', 'M001', 'T001'),
('192.168.1.101', 'contact@imdb.com', '9876543210', 4, 'CityPlex Theater', 'M002', 'T002'),
('192.168.1.102', 'support@example.com', '5555555555', 3, 'Starlight Multiplex', 'M003', 'T003'),
('192.168.1.103', 'webmaster@imdb.com', '3333333333', 3, 'Sunset Cinema', 'M004', 'T004'),
('192.168.1.104', 'info@imdb.com', '7777777777', 4, 'MegaMax Theatres', 'M005', 'T005'),
('192.168.1.105', 'contact@example.com', '4444444444', 3, 'Golden Screen Cinema', 'M006', 'T006'),
('192.168.1.106', 'webmaster@imdb.com', '6666666666', 4, 'CinePlex', 'M007', 'T007');

    
    create table `ticket` (
    `ticket_id` varchar(10) not null,
    `t_id` varchar(10) not null,
    `mov_id` varchar(10) not null,
    `price` int not null,
    `seat_no` int not null,
    `time` time not null, 
    primary key(`ticket_id`),
    constraint `fk_ticket_theatre` foreign key(`t_id`) references `theatre`(`t_id`) on delete cascade,
    constraint `fk_ticket_movie` foreign key(`mov_id`) references `movie`(`mov_id`) on delete cascade);
    
INSERT INTO `ticket` (`ticket_id`, `t_id`,`mov_id`, `price`, `seat_no`, `time`) VALUES
('TKT001', 'T001','M001', 10, 10, '15:00:00'),
('TKT002', 'T002','M002', 12, 20, '16:30:00'),
('TKT003', 'T003','M003', 11, 30, '18:15:00'),
('TKT004', 'T004','M004', 13, 40, '19:45:00'),
('TKT005', 'T005','M005',14, 50, '21:00:00');


DELIMITER //

DELIMITER //
CREATE FUNCTION CalculateTotalRevenue(movID VARCHAR(10))
RETURNS INT
READS SQL DATA
BEGIN
    DECLARE totalRevenue INT;

    -- Calculate total revenue for the ticket
    SELECT price * seat_no INTO totalRevenue
    FROM ticket
    WHERE mov_id = movID;

    -- Return the calculated total revenue
    RETURN totalRevenue;
END;
//
DELIMITER ;

alter table movie add column popularity int;
-- Update the popularity column in the movie table for each movie
UPDATE movie AS m
SET popularity = (
    SELECT CalculateTotalRevenue(t.ticket_id)
    FROM ticket AS t
    WHERE m.mov_id = t.mov_id
);



    
    create table `music_artist` (
    `m_id` varchar(10) not null,
     `f_name` char(15) not null,
    `l_name` char(15) not null,
    `contact_no` varchar(10) not null,
    `ratings` int default null,
    `gender` enum('M','F','O') NOT NULL,
    `dob` date not null,
    `works` varchar(20) default null,
    `mov_id` varchar(10) not null,
    primary key(`m_id`),
    constraint `fk_music_movie` foreign key (`mov_id`) references `movie`(`mov_id`) on delete cascade);
    
    INSERT INTO `music_artist` VALUES
('MA001', 'Ash', 'king', '1234567890', 8, 'M', '1980-05-10', ' Zee Music Company', 'M001'),
('MA002', ' Bashir', 'Lone', '9876543210', 6, 'M', '1985-03-18', 'Time music', 'M002'),
('MA003', 'Rekha', 'Bharadwaj', '5555555555', 7, 'F', '1975-09-05', 'Zee Music Company', 'M003'),
('MA004', 'Parineeti', 'Chopra', '3333333333', 6.5, 'F', '1988-11-25', 'Zee Music Company', 'M004'),
('MA005', 'Rahat', 'khan', '7777777777', 7.9, 'M', '1982-07-30', 'T Series', 'M005');


    
   CREATE TABLE `budget` (
    `b_id` varchar(10) not null,
    `mov_id` varchar(10) not null,
    `expenditure` int not null,
    `profit` int not null,
    `status` ENUM('HIT', 'FLOP', 'AVG') null,  
    primary key(`b_id`)
);

DELIMITER //
CREATE PROCEDURE CheckMoviePerformance(IN movID VARCHAR(10), OUT performance VARCHAR(10))
BEGIN
    DECLARE totalRevenue INT;
    DECLARE totalSpending INT;

    -- Calculate total revenue for the movie
    SELECT SUM(price * seat_no) INTO totalRevenue
    FROM ticket
    WHERE mov_id = movID;

    -- Calculate total spending for the movie from the budget table
    SELECT expenditure INTO totalSpending
    FROM budget
    WHERE mov_id = movID;

    -- Compare revenue and spending to determine performance
    IF totalRevenue >= totalSpending THEN
        SET performance = 'hit';
    ELSE
        SET performance = 'flop';
    END IF;
END;
//
DELIMITER ;

INSERT INTO `budget` VALUES
('B001', 'M001', 6000, 1000,NULL),
('B002', 'M002', 4000, 6000, NULL),
('B003', 'M003', 3000, 25000, NULL),
('B004', 'M004', 7500, 8000, NULL),
('B005', 'M005', 8000, 60000, NULL),
('B006', 'M006', 4500, 45000, NULL),
('B007', 'M007', 5500, 50000, NULL);

    
    
    create table `writer` (
    `writer_id` varchar(10) not null,
     `f_name` char(15) not null,
    `l_name` char(15) not null,
    `contact_no` varchar(10)  null,
    `ratings` int default null,
    `gender` enum('M','F','O') NOT NULL,
    `dob` date not null,
    `works` varchar(200) default null,
    primary key(`writer_id`));
    
    DELIMITER //
CREATE TRIGGER before_insert_writer
BEFORE INSERT ON `writer`
FOR EACH ROW
BEGIN

    IF NEW.ratings IS NULL THEN
        SET NEW.ratings = 7;
    END IF;
END;
//
DELIMITER ;

   INSERT INTO `writer` VALUES
('W001', 'Chetan', 'Bhagat', '9994859948', 9.8, 'M', '1974-04-22', 'Half-girlfriend, one indian girl, story of my marriage'),
('W002', 'William', 'Shakespeare', NULL, NULL, 'M', '1515-02-11', 'Hamlet, Romeo-Juliet, Macbeth'),
('W003', 'Keigo', 'Higashino', NULL, 9.6, 'M', '1958-02-04', 'The Devotion of Suspect X, The Miracles of the Namiya General Store, Lakeside'),
('W004', 'Paula', 'Hawkins', NULL, 9.2, 'F', '1972-08-26', 'Girl on the train, new life rules, merilyn in mexico'),
('W005', 'Santosh', 'Echikkanam', '8598699949', 7.5, 'M', '1982-03-28', 'Bhoomi, aasama, rang');


    create table `book`(
    `book_id` varchar(10) not null,
    `writer_id` varchar(10) not null,
    `mov_id` varchar(10) not null,
    `b_name` varchar(30) not null,
    `language` char(5),
    primary key(`book_id`,`b_name`),
     constraint `fk_movie_book` foreign key (`mov_id`) references `movie`(`mov_id`) on delete cascade,
	constraint `fk_book_writer` foreign key (`writer_id`) references `writer`(`writer_id`) on delete cascade);
    
    insert into `book` values('B001','W001','M001','Half-girlfriend','Eng'),
							('B002','W002','M002','Hamlet','Eng'),
                            ('B003','W003','M003','The Devotion of Suspect X','Jap'),
                            ('B004','W004','M004','Girl on the train','Eng'),
                            ('B005','W005','M005','Bhoomi','Hin'),
                            ('B006','W001','M006','2 States','Eng');
    
create table `actor_list`(
	`mov_id` varchar(30) not null,
    `actor_id` varchar(30)  not null,
    primary key(`mov_id`,`actor_id`),
	constraint `fk_movie_rel` foreign key (`mov_id`) references `movie`(`mov_id`) on delete cascade,
	constraint `fk_actor_rel` foreign key (`actor_id`) references `actor`(`actor_id`) on delete cascade
);

insert into `actor_list` values('M001', 'ACT001'),('M001', 'ACT002'),('M002', 'ACT003'),('M002', 'ACT004'),
('M002', 'ACT001'),('M003', 'ACT005'),('M003', 'ACT004'),('M004', 'ACT006'),('M004','ACT007'),('M005','ACT007');

create table `image_list`(
`id` varchar(30) not null,
`img` varchar(30) not null,
primary key(id));    
insert into `image_list` values('ACT001','sharaddhakapoor.jpg'),
('ACT002','arjubkapoor.jpg'),('ACT003','shahidkapoor.jpg'),
('ACT004','tabu.jpg'),('ACT005','ad.jpg'),('ACT006','pari.jpg'),('ACT008','sandutt.jpg'),
('ACT007','ARH.jpg'),('ACT009','AB.jpg'),('M006','2states.jpg'),
('M001','hgfmov.jpg'),('M002','haidermov.jpg'),('M003','drishyam.jpg'),('M004','gott.jpg'),
('M005','bhoomi.jpg'),('B001','hgf_book.jpg'),('B002','hamlet.jpg'),('B003','tdos.jpg'),
('B004','gottbook.jpg'),('B005','bhoomibook.jpg'),('B006','2statesbook.jpg'),('W001','chetan.jpg'),
('W002','shakespear.jpg'),('W003','keigo.jpg'),('W004','paula.jpg'),('W005','santosh.jpg'),
('DIR01','mohitsuri.jpg'),('DIR02','vishalbharadwaj.jpg'),('DIR03','nishantkamat.jpg'),('DIR04','ribhudas.jpg'),
('DIR05','umangkumar.jpg'),('DIR06','AbhishekVerma.jpg');

create table `accounts`(
`email` varchar(30) not null,
`username` varchar(30) not null,
`password` varchar(30) not null,
`auth` varchar(10) not null
);

insert into `accounts` values('admin@gmail.com','admin','admin','admin'),
('user@gmail.com','user','user','user');

CREATE TABLE IF NOT EXISTS Images (id INTEGER PRIMARY KEY,image LONGBLOB);
    