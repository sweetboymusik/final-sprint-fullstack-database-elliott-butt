CREATE TABLE books
(
    id integer NOT NULL,
    title character varying(50) NOT NULL,
    author_id integer NOT NULL,
    genre_id integer NOT NULL,
    publisher_id integer NOT NULL,
    publication_date date,
    word_count integer,
    CONSTRAINT author_id FOREIGN KEY (author_id)
        REFERENCES public.authors (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT genre_id FOREIGN KEY (genre_id)
        REFERENCES public.genres (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT publisher_id FOREIGN KEY (publisher_id)
        REFERENCES public.publishers (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

-- Science Fiction (1)
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (1, 'Galactic Odyssey', 11, 1, 13, '1946-02-01', 85350);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (2, 'Quantum Leap', 12, 1, 14, '1955-03-15', 112350);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (3, 'The Time Traveler', 30, 1, 1, '1967-09-06', 195109);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (4, 'Spacebound', 21, 1, 3, '1973-05-11', 134259);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (5, 'Alien Invasion', 15, 1, 2, '1980-07-22', 156497);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (6, 'Cybernetic Dreams', 28, 1, 8, '1984-08-30', 145832);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (7, 'The Last Colony', 22, 1, 10, '1991-11-14', 170291);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (8, 'Galactic Odyssey II', 11, 1, 13, '1997-02-09', 153239);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (9, 'Starship Troopers', 35, 1, 5, '2002-12-17', 183984);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (10, 'Warp Speed', 17, 1, 6, '2010-03-19', 165427);

-- Fantasy (2)
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (11, 'Enchanted Forest', 34, 2, 3, '1948-12-05', 181363);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (12, 'The Dragon''s Quest', 41, 2, 9, '1956-05-29', 84014);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (13, 'Wizards'' Realm', 50, 2, 12, '1962-10-12', 122583);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (14, 'Magic Kingdom', 44, 2, 8, '1970-01-21', 145939);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (15, 'Elven Magic', 29, 2, 13, '1981-07-16', 171274);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (16, 'The Sorcerer''s Apprentice', 47, 2, 15, '1985-06-09', 159764);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (17, 'Fairy Tales Reimagined', 36, 2, 7, '1990-12-11', 133741);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (18, 'The Quest for the Crown', 39, 2, 11, '1995-09-02', 190516);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (19, 'Legend of the Lost City', 50, 2, 14, '2001-05-25', 174869);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (20, 'Dragons'' Legacy', 23, 2, 4, '2007-04-13', 160290);

-- Mystery (3)
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (21, 'Mystery at the Manor', 37, 3, 3, '1988-12-18', 54969);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (22, 'The Secret Chamber', 33, 3, 11, '1989-02-03', 120417);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (23, 'Deadly Whispers', 31, 3, 12, '1992-06-22', 139748);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (24, 'The Case of the Missing Gem', 45, 3, 5, '1997-08-15', 102382);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (25, 'Murder in the Alley', 29, 3, 13, '2000-12-30', 119847);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (26, 'The Vanishing Act', 40, 3, 6, '2004-07-10', 134298);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (27, 'Suspicion in the Shadows', 42, 3, 7, '2009-03-20', 148329);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (28, 'The Detective''s Dilemma', 33, 3, 8, '2011-05-14', 156897);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (29, 'The Final Clue', 25, 3, 10, '2015-11-29', 142576);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (30, 'The Hidden Agenda', 39, 3, 14, '2019-02-10', 121485);

-- Thriller (4)
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (31, 'The Last Stand', 50, 4, 5, '1930-04-14', 158778);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (32, 'Shadow of the Night', 49, 4, 7, '1942-05-14', 171013);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (33, 'Deadly Intentions', 21, 4, 9, '1954-09-30', 145689);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (34, 'Twisted Fate', 40, 4, 8, '1961-12-10', 123479);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (35, 'The Perfect Crime', 18, 4, 3, '1972-04-22', 135690);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (36, 'Chase in the Dark', 46, 4, 12, '1983-07-17', 147345);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (37, 'The Silent Assassin', 26, 4, 13, '1990-11-05', 154278);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (38, 'Dangerous Secrets', 34, 4, 10, '1999-06-23', 176839);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (39, 'In the Crossfire', 28, 4, 11, '2007-08-12', 183294);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (40, 'Betrayal at Dawn', 47, 4, 6, '2014-01-29', 142976);

-- Romance (5)
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (41, 'Love in the Air', 1, 5, 2, '2020-02-21', 166610);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (42, 'Heart''s Desire', 22, 5, 4, '2020-09-10', 131564);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (43, 'Forever Yours', 14, 5, 7, '2021-03-18', 139872);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (44, 'A Match Made in Heaven', 13, 5, 6, '2022-01-05', 148219);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (45, 'Love''s Last Hope', 26, 5, 12, '2022-06-30', 142390);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (46, 'Romance on the Beach', 17, 5, 8, '2023-07-22', 118603);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (47, 'Sweetheart', 39, 5, 11, '2024-02-15', 134528);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (48, 'Love''s Embrace', 50, 5, 14, '2024-05-04', 126740);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (49, 'The Perfect Partner', 33, 5, 15, '2024-08-12', 142370);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (50, 'Passionate Hearts', 47, 5, 13, '2024-11-10', 131589);

-- Horror (6)
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (51, 'Haunted House', 31, 6, 11, '1939-11-27', 150505);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (52, 'Nightmare Realm', 9, 6, 12, '1955-04-09', 176207);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (53, 'The Cursed Crypt', 21, 6, 4, '1962-10-25', 142039);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (54, 'Evil Beneath', 38, 6, 5, '1971-07-10', 139084);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (55, 'The Phantom''s Revenge', 42, 6, 8, '1980-09-21', 169238);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (56, 'Blood Moon', 43, 6, 7, '1985-11-18', 174493);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (57, 'The Haunting', 16, 6, 9, '1990-06-30', 155829);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (58, 'Graveyard Secrets', 39, 6, 13, '1998-03-01', 162920);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (59, 'The Demon''s Call', 26, 6, 14, '2003-04-10', 140542);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (60, 'Vampire''s Curse', 48, 6, 12, '2009-09-22', 179043);

-- Historical Fiction (7)
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (61, 'Echoes of the Past', 16, 7, 9, '1976-10-19', 138442);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (62, 'The Lost Empire', 17, 7, 14, '1990-07-02', 75550);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (63, 'Journey Through Time', 41, 7, 10, '1993-12-20', 164290);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (64, 'The Great War Chronicles', 34, 7, 11, '2000-11-05', 154170);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (65, 'Ancient Secrets', 45, 7, 12, '2003-08-22', 145673);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (66, 'The Revolutionary''s Diary', 50, 7, 13, '2006-10-12', 139098);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (67, 'Renaissance Revelations', 31, 7, 7, '2010-02-17', 167249);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (68, 'The Victorian Era', 44, 7, 8, '2012-09-25', 180362);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (69, 'The Medieval Mystery', 21, 7, 14, '2015-04-09', 152317);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (70, 'Warrior''s Path', 28, 7, 9, '2017-06-03', 161479);

-- Non-Fiction (8)
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (71, 'The Real Story', 12, 8, 6, '2008-11-20', 31932);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (72, 'Protocol of History', 22, 8, 15, '2008-12-06', 173740);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (73, 'Understanding Science', 31, 8, 9, '2009-07-15', 189320);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (74, 'World''s Wonders', 26, 8, 10, '2011-11-05', 162590);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (75, 'The Power of Knowledge', 18, 8, 8, '2013-02-28', 134932);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (76, 'Life''s Lessons', 42, 8, 5, '2015-08-12', 159099);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (77, 'Innovation and Change', 34, 8, 7, '2018-06-22', 143045);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (78, 'Economic Insights', 29, 8, 13, '2020-04-05', 121368);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (79, 'Political Movements', 17, 8, 15, '2022-01-23', 165957);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (80, 'The Human Mind', 43, 8, 14, '2024-03-16', 178249);

-- Young Adult (9)
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (81, 'Teen Spirit', 31, 9, 12, '2013-04-15', 109842);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (82, 'Adventure Awaits', 35, 9, 13, '2014-09-10', 127013);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (83, 'High School Secrets', 27, 9, 8, '2016-06-18', 142098);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (84, 'Teen Romance', 40, 9, 14, '2018-03-03', 138265);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (85, 'The Young Hero', 33, 9, 15, '2020-08-11', 155647);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (86, 'The Last Summer', 16, 9, 6, '2021-07-19', 162950);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (87, 'Mystery in the School', 20, 9, 10, '2022-12-24', 150342);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (88, 'Growing Up Fast', 22, 9, 13, '2023-05-06', 174579);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (89, 'Journey to the Unknown', 42, 9, 12, '2024-01-17', 169830);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (90, 'Teenage Dream', 47, 9, 7, '2024-06-04', 145203);

-- Biography (10)
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (91, 'A Life Well Lived', 18, 10, 6, '1999-11-10', 153009);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (92, 'My Journey', 21, 10, 15, '2002-01-14', 120055);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (93, 'The Untold Story', 30, 10, 8, '2004-07-12', 162405);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (94, 'In Their Shoes', 39, 10, 14, '2007-09-08', 171094);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (95, 'Beyond the Horizon', 46, 10, 12, '2011-03-15', 183411);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (96, 'The Road Traveled', 50, 10, 13, '2014-10-21', 158563);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (97, 'A Legacy of Triumph', 27, 10, 9, '2016-04-30', 141842);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (98, 'Behind the Curtain', 34, 10, 11, '2018-06-08', 119037);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (99, 'The Power of One', 35, 10, 7, '2020-08-20', 136804);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (100, 'Portrait of a Life', 42, 10, 6, '2022-12-12', 162957);

-- Science Fiction (1)
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (101, 'Galactic Odyssey', 4, 1, 2, '2000-01-10', 183445);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (102, 'Quantum Leap', 5, 1, 3, '1995-02-15', 170201);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (103, 'Starborn Legacy', 6, 1, 4, '1999-03-20', 142560);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (104, 'The Fifth Dimension', 7, 1, 5, '2003-04-25', 198342);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (105, 'Android Dreams', 8, 1, 6, '1950-05-30', 175640);

-- Fantasy (2)
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (106, 'Dragons of Eldoria', 9, 2, 7, '2020-01-20', 159832);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (107, 'The Enchanted Forest', 10, 2, 8, '2019-02-25', 168404);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (108, 'Sorcerer''s Realm', 11, 2, 9, '2000-03-30', 147290);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (109, 'The Mystic Quest', 12, 2, 10, '1987-04-15', 162089);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (110, 'Wizards of Avalon', 13, 2, 11, '1978-05-10', 177455);

-- Mystery (3)
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (111, 'The Secret Society', 14, 3, 12, '2023-01-15', 153670);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (112, 'Murder in the Mansion', 15, 3, 13, '2021-02-20', 142963);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (113, 'The Vanishing Act', 16, 3, 14, '2014-03-05', 158234);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (114, 'The Hidden Clue', 17, 3, 15, '1954-04-10', 176488);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (115, 'The Final Alibi', 18, 3, 6, '1969-05-25', 169832);

-- Thriller (4)
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (116, 'The Last Witness', 19, 4, 7, '1980-01-25', 182903);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (117, 'Shattered Truth', 20, 4, 8, '1990-02-10', 173401);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (118, 'Deadly Games', 21, 4, 9, '2001-03-15', 165932);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (119, 'The Silent Killer', 22, 4, 10, '2009-04-30', 147601);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (120, 'Code of Deception', 23, 4, 11, '1949-05-20', 179650);

-- Romance (5)
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (121, 'Love Under the Stars', 24, 5, 12, '2000-01-30', 134879);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (122, 'Heart''s Path', 25, 5, 13, '2001-02-25', 142023);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (123, 'Eternal Affection', 26, 5, 14, '2002-03-12', 153470);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (124, 'Love''s Journey', 27, 5, 15, '2003-04-15', 146829);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (125, 'Together Forever', 28, 5, 6, '2004-05-05', 139240);

-- Horror (6)
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (126, 'Shadows of Terror', 29, 6, 10, '2005-01-10', 155678);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (127, 'The Haunting Hour', 30, 6, 11, '2006-02-05', 168394);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (128, 'Creepy Tales', 31, 6, 12, '2007-03-15', 140287);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (129, 'Gothic Shadows', 32, 6, 13, '2008-04-20', 163992);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (130, 'Dark Descent', 33, 6, 14, '2009-05-15', 171429);

-- Historical Fiction (7)
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (131, 'The Kingslayer', 34, 7, 15, '1989-01-25', 154804);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (132, 'Legends of the Past', 35, 7, 6, '1978-02-20', 162789);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (133, 'The Lost Kingdom', 36, 7, 7, '1987-03-15', 174956);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (134, 'Historical Echoes', 37, 7, 8, '1977-04-10', 147222);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (135, 'A Tale of Two Worlds', 38, 7, 9, '1999-05-05', 158319);

-- Non-Fiction (8)
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (136, 'Science Unveiled', 39, 8, 10, '2020-01-15', 187260);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (137, 'Understanding Culture', 40, 8, 11, '2019-02-10', 172468);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (138, 'The Art of Leadership', 41, 8, 12, '2018-03-05', 161384);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (139, 'History''s Mysteries', 42, 8, 13, '2017-04-20', 178579);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (140, 'Philosophical Views', 43, 8, 14, '1999-05-15', 155702);

-- Young Adult (9)
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (141, 'Summer Adventures', 44, 9, 15, '1948-01-20', 139489);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (142, 'The Secret Club', 45, 9, 6, '1937-02-15', 152708);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (143, 'A New Beginning', 46, 9, 7, '1993-03-10', 143982);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (144, 'The Magical Quest', 47, 9, 8, '2004-04-05', 167293);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (145, 'Voices of Youth', 48, 9, 9, '2009-05-01', 155680);

-- Biography (10)
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (146, 'An Unforgettable Life', 49, 10, 10, '1997-01-30', 159043);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (147, 'Through My Eyes', 50, 10, 11, '1976-02-25', 167482);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (148, 'Unseen Struggles', 50, 10, 12, '1980-03-20', 175342);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (149, 'My Life, My Story', 10, 10, 13, '2007-04-15', 143852);
INSERT INTO books (id, title, author_id, genre_id, publisher_id, publication_date, word_count) VALUES (150, 'Echoes of My Past', 7, 10, 14, '2015-05-10', 158475);
