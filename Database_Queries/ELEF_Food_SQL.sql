create database elef2;
use elef2;

SET GLOBAL FOREIGN_KEY_CHECKS=0;  

select * from elef_carrybox;
select * from elef_address;
select * from elef_branch;
select * from elef_category;
select * from elef_item;
select * from elef_order;
select * from elef_subcategory;
select * from elef_user;
----------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------

desc elef_carrybox;

insert into elef_carrybox values(1001,0 );
insert into elef_carrybox values(1002,0);
insert into elef_carrybox values(1003,0);
insert into elef_carrybox values(1004,0);
insert into elef_carrybox values(1005,0);
insert into elef_carrybox values(1006,0);
insert into elef_carrybox values(1007,0);

desc elef_branch;
insert into elef_branch values(2001,'Bangalore','Tin Factory','995999956','shivamyadav9293@gmail.com');
insert into elef_branch values(2002,'Chennai','T Nagar','500235','moksha@gmail.com');
insert into elef_branch values(2003,'Hyderabad','Gachibowli','500236','vidya@gmail.com');
insert into elef_branch values(2004,'Lucknow','Lucknow','500236','aswitha@gmail.com');
insert into elef_branch values(2005,'New Delhi','New Delhi','500236','agrim@gmail.com');


desc elef_user;
select * from elef_user;
insert into elef_user values('shivam4uas@gmail.com','Shivam','9999999996','Shivam@12','Admin','Imagine','what is your favourite food',1003);
insert into elef_user values('hactech207@gmail.com','Elvish','99599999756','Shivam@12','Customer','Elvish','what is your name',1005);
insert into elef_user values('aar@gmail.com','Aarohi','9999999994','Aar@12','Customer','chocolate','what is your favourite food',1006);
insert into elef_user values('pravallikakonduru17@gmail.com','Pravallika','9999999999','Prav@12','Admin','chocolate','what is your favourite food',1001);
insert into elef_user values('moksha@gmail.com','Moksha','9999999998','Moksh@12','Admin','singing','what is your hobbie',1002);
insert into elef_user values('vidya@gmail.com','vidya','9999999996','vidya@12','Admin','dancing','what is your favourite hobbie',1004);


desc elef_address;

insert into elef_address values(3001,'Chennai','Temple','D-No:2-10','Abbanagudavalli','9999999999','Pravallika','pravallikakonduru17@gmail.com');
insert into elef_address values(3002,'Hyderabad','Road','D-No:2-11','Kolluru','9999999999','Moksha','moksha@gmail.com');
insert into elef_address values(3003,'Bangalore','Temple','D-No:2-12','Khammam','9999999999','Elvish','hactech207@gmail.com');
insert into elef_address values(3004,'Chennai','Road','D-No:2-13','Pumping wellroad','9999999999','Shivam','shivamyadav9293@gmail.com');
insert into elef_address values(3005,'Chennai','Temple','D-No:2-14','Ravikampadu','9999999999','Swathi','swati@gmail.com');
insert into elef_address values(3006,'Hyderabad','Road','D-No:2-15','chintalamma vari veedi','9999999999','Aarohi','aar@gmail.com');
insert into elef_address values(3007,'Hyderabad','KKR Apartments','D-No:2-16','Phoenix Mall','9999999999','Aarohi','aar@gmail.com');


-- categories for HYDERABAD;

desc elef_category;
select * from elef_category;
insert into elef_category values(2013,'fashion',2005);
insert into elef_category values(2014,'electronics',2005);
insert into elef_category values(2015,'Gadgets',2005);

-- Catgeories for CHENNAI;

insert into elef_category values(7004,'Food',2002);
insert into elef_category values(7005,'Chill',2002);


-- categories for BANGALORE;

insert into elef_category values(7006,'Food',2003);
insert into elef_category values(7007,'Drinks',2003);


-- SUBCATEGORIES- HYDERABAD;

 
 insert into elef_subcategory values(2004,'Curries',7001);
 insert into elef_subcategory values(2005,'Indian Breads',7001);
 insert into elef_subcategory values(2006,'Desserts',7003);
 insert into elef_subcategory values(2007,'Beverages',7002);


//SUBACATEGORIES - CHENNAI;
 insert into elef_subcategory values(5008,'Biryanis',7004);
 insert into elef_subcategory values(5009,'Starters',7004);
 insert into elef_subcategory values(5010,'Kebabs',7004);
 insert into elef_subcategory values(5011,'Curries',7004);
 insert into elef_subcategory values(5012,'Desserts',7005);

//SUBCATEGORIES - BANGALORE;
 insert into elef_subcategory values(5013,'Biryanis',7006);
 insert into elef_subcategory values(5014,'Starters',7006);
 insert into elef_subcategory values(5015,'Curries',7006);
 insert into elef_subcategory values(5016,'Indian Breads',7006);
 insert into elef_subcategory values(5017,'Beverages',7007);



-- ITEMS -HYDERABAD;

desc elef_item;
insert into elef_item values (2001,1,'Chicken','Chicken Biryani',210,'','','2001.jpg',1,'s','non-veg',2001,'1005',5001);
insert into elef_item values (2002,1,'','Mutton Biryani',253,'','','2002.jpg',1,'ns','non-veg',2001,'',5001);
insert into elef_item values (2003,1,'','Chicken Family Pack',552,'','','2003.jpg',1,'ns','non-veg',2001,'',5001);
insert into elef_item values (2004,0,'','Mutton Family Pack',576,'','','2004.jpg',1,'ns','non-veg',2001,'',5001);
insert into elef_item values (2005,1,'','Spl Chicken Biryani',335,'','','2005.jpg',1,'ns','non-veg',2001,'',5001);
insert into elef_item values (2006,1,'','Spl Mutton Biryani',351,'','','2006.jpg',1,'ns','non-veg',2001,'',5001);
insert into elef_item values (2007,1,'','Egg Biryani',154,'','','2007.jpg',1,'s','non-veg',2001,'',5001);
insert into elef_item values (2008,1,'','Veg-Biryani',154,'','','2008.jpg',1,'ns','veg',2001,'',5001);

insert into elef_item values (2001,1,'JEANS FOR MEN STYLISH','HILFIGHER JEANS',1544,'','jpg','3000.jpg',1,'ns','FASHION',2001,2001,2001);


insert into elef_item values (2009,1,'','Chilli Chicken',290,'','','2009.jpg',1,'ns','non-veg',2001,'',5002);
insert into elef_item values (2010,0,'','Chicken 65',249,'','','2010.jpg',1,'ns','non-veg',2001,'',5002);
insert into elef_item values (2011,1,'','Pepper Chicken',199,'','','2011.jpg',1,'ns','non-veg',2001,'',5002);
insert into elef_item values (2012,1,'','Paneer 65',150,'','','2012.jpg',1,'s','veg',2001,'',5002);
insert into elef_item values (2013,1,'','Veg Manchurian',819,'','','2013.jpg',1,'ns','veg',2001,'',5002);

insert into elef_item values (2014,1,'','Chicken Tikka Kebab',243,'','','2014.jpg',1,'ns','non-veg',2001,'',5003);
insert into elef_item values (2015,0,'','Tandoori (Half)',243,'','','2015.jpg',1,'ns','non-veg',2001,'',5003);
insert into elef_item values (2016,1,'','Tandoori (Full)',379,'','','2016.jpg',1,'ns','non-veg',2001,'',5003);
insert into elef_item values (2017,1,'','Chckn-Reshmi Kebab',243,'','','2017.jpg',1,'s','non-veg',2001,'',5003);
insert into elef_item values (2018,1,'','Chicken-garlic kebab',243,'','','2018.jpg',1,'ns','non-veg',2001,'',5003);

insert into elef_item values (2019,1,'','Butter Chicken',246,'','','2019.jpg',1,'ns','non-veg',2001,'',5004);
insert into elef_item values (2020,1,'','Nizami handi',171,'','','2020.jpg',1,'s','veg',2001,'',5004);

insert into elef_item values (2021,0,'','Tandoori Roti',264,'','','2021.jpg',1,'ns','veg',2001,'',5005);
insert into elef_item values (2022,1,'','Rumali Roti',196,'','','2022.jpg',1,'s','veg',2001,'',5005);
insert into elef_item values (2023,1,'','Roti',196,'','','2023.jpg',1,'s','veg',2001,'',5005);


insert into elef_item values (2024,0,'','Qubani Ka Meetha',107,'','','2024.jpg',1,'ns','veg',2001,'',5006);
insert into elef_item values (2025,1,'','Double Ka Meetha',73,'','','2025.jpg',1,'s','veg',2001,'',5006);

insert into elef_item values (2026,1,'','Diet Coke',150,'','','2026.jpg',1,'s','veg',2001,'',5007);
insert into elef_item values (2027,1,'','Thums Up',50,'','','2027.jpg',1,'ns','veg',2001,'',5007);
insert into elef_item values (2028,0,'','Mineral Water',45,'','','2028.jpg',1,'ns','veg',2001,'',5007);
insert into elef_item values (2029,1,'','Maaza',45,'','','2029.jpg',1,'ns','veg',2001,'',5007);
insert into elef_item values (2030,0,'','Sprite',45,'','','2030.jpg',1,'ns','veg',2001,'',5007);
insert into elef_item values (2031,1,'','Coke Tin',60,'','','2031.jpg',1,'ns','veg',2001,'',5007);
insert into elef_item values (2032,1,'','Fanta',45,'','','2032.jpg',1,'ns','veg',2001,'',5007);


//ITEMS - CHENNAI;
insert into elef_item values (2033,1,'','Chicken Biryani',210,'','','2033.jpg',1,'s','non-veg',2002,'',5008);
insert into elef_item values (2034,1,'','Mutton Biryani',253,'','','2034.jpg',1,'ns','non-veg',2002,'',5008);
insert into elef_item values (2035,1,'','Chicken Family Pack',552,'','','2035.jpg',1,'ns','non-veg',2002,'',5008);
insert into elef_item values (2036,1,'','Spm Chicken Biryani',784,'','','2036.jpg',1,'ns','non-veg',2002,'',5008);
insert into elef_item values (2037,0,'','Spm Mutton Biryani',819,'','','2037.jpg',1,'s','non-veg',2002,'',5008);
insert into elef_item values (2038,1,'','Veg-Family Pack',383,'','','2038.jpg',1,'ns','veg',2002,'',5008);
insert into elef_item values (2039,1,'','Veg-Spm Pack',574,'','','2039.jpg',1,'s','veg',2002,'',5008);


insert into elef_item values (2040,1,'','Pepper Chicken',199,'','','2040.jpg',1,'ns','non-veg',2002,'',5009);
insert into elef_item values (2041,1,'','Paneer 65',150,'','','2041.jpg',1,'s','veg',2002,'',5009);
insert into elef_item values (2042,1,'','Veg Manchurian',819,'','','2042.jpg',1,'ns','veg',2002,'',5009);

insert into elef_item values (2043,1,'','Chicken Tikka Kebab',243,'','','2043.jpg',1,'ns','non-veg',2002,'',5010);
insert into elef_item values (2044,0,'','Tandoori (Half)',243,'','','2044.jpg',1,'ns','non-veg',2002,'',5010);
insert into elef_item values (2045,1,'','Tandoori (Full)',379,'','','2045.jpg',1,'ns','non-veg',2002,'',5010);


insert into elef_item values (2046,1,'','Paneer Butter Masala',246,'','','2046.jpg',1,'ns','non-veg',2002,'',5011);
insert into elef_item values (2047,1,'','Green Peas Masala',171,'','','2047.jpg',1,'s','veg',2002,'',5011);
insert into elef_item values (2048,1,'','Butter Chicken',171,'','','2048.jpg',1,'s','veg',2002,'',5011);


insert into elef_item values (2049,1,'','Venilla',290,'','','2049.jpg',1,'ns','non-veg',2002,'',5012);
insert into elef_item values (2050,0,'','StrawBerry',249,'','','2050.jpg',1,'ns','non-veg',2002,'',5012);
insert into elef_item values (2051,0,'','Chocolate',249,'','','2051.jpg',1,'ns','non-veg',2002,'',5012);



//ITEMS_ BANGALORE;

insert into elef_item values (2052,1,'','Veg-Biryani Pack',574,'','','2052.jpg',1,'s','veg',2003,'',5013);
insert into elef_item values (2053,1,'','Veg-Spm Pack',574,'','','2053.jpg',1,'s','veg',2003,'',5013);
insert into elef_item values (2054,1,'','Chicken Biryani',210,'','','2054.jpg',1,'s','non-veg',2003,'',5013);
insert into elef_item values (2055,1,'','Mutton Biryani',253,'','','2055.jpg',1,'ns','non-veg',2003,'',5013);
insert into elef_item values (2056,1,'','Chicken Family Pack',552,'','','2056.jpg',1,'ns','non-veg',2003,'',5013);
insert into elef_item values (2057,0,'','Mutton Family Pack',576,'','','2057.jpg',1,'ns','non-veg',2003,'',5013);

insert into elef_item values (2058,0,'','Chicken 65',249,'','','2058.jpg',1,'ns','non-veg',2003,'',5014);
insert into elef_item values (2059,1,'','Pepper Chicken',199,'','','2059.jpg',1,'ns','non-veg',2003,'',5014);
insert into elef_item values (2060,1,'','Paneer 65',150,'','','2060.jpg',1,'s','veg',2003,'',5014);
insert into elef_item values (2061,1,'','Veg Manchurian',819,'','','2061.jpg',1,'ns','veg',2003,'',5014);

insert into elef_item values (2062,1,'','Nizami handi',171,'','','2062.jpg',1,'s','veg',2003,'',5015);
insert into elef_item values (2063,1,'','Paneer Tikka Masala',246,'','','2063.jpg',1,'ns','non-veg',2003,'',5015);
insert into elef_item values (2064,1,'','Green Peas Masala',171,'','','2064.jpg',1,'s','veg',2003,'',5015);
insert into elef_item values (2065,1,'','Butter Chicken',171,'','','2065.jpg',1,'s','veg',2003,'',5015);


insert into elef_item values (2066,0,'','Tandoori Roti',264,'','','2066.jpg',1,'ns','veg',2003,'',5016);
insert into elef_item values (2067,1,'','Rumali Roti',196,'','','2067.jpg',1,'s','veg',2003,'',5016);
insert into elef_item values (2068,0,'','Butter Naan',264,'','','2068.jpg',1,'ns','veg',2003,'',5016);
insert into elef_item values (2069,1,'','Roti',196,'','','2069.jpg',1,'s','veg',2003,'',5016);

insert into elef_item values (2070,1,'','Mozitto',150,'','','2070.jpg',1,'s','veg',2003,'',5017);
insert into elef_item values (2071,1,'','Thums Up',50,'','','2071.jpg',1,'ns','veg',2003,'',5017);
insert into elef_item values (2072,0,'','Limca',45,'','','2072.jpg',1,'ns','veg',2003,'',5017);
insert into elef_item values (2073,1,'','Maaza',45,'','','2073.jpg',1,'ns','veg',2003,'',5017);
insert into elef_item values (2074,0,'','Sprite',45,'','','2074.jpg',1,'ns','veg',2003,'',5017);


commit;







insert into elef_user values('kumar@gmail.com','kumar','9988241111','Kumar@12','Admin','dancing','what is your favourite hobbie',1007);

insert into elef_branch values(2004,'Hyderabad','Hitec-City','500235','kumar@gmail.com');

insert into elef_category values(7008,'Food',2004);
insert into elef_category values(7009,'Drinks',2004);
insert into elef_category values(7010,'Chill',2004);

 insert into elef_subcategory values(5018,'Starters',7008);
 insert into elef_subcategory values(5019,'Beverages',7009);
 insert into elef_subcategory values(5020,'Beverages',7010);


insert into elef_item values (2075,1,'','Venilla',290,'','','2075.jpg',1,'ns','non-veg',2004,'',5019);
insert into elef_item values (2076,1,'','StrawBerry',249,'','','2076.jpg',1,'ns','non-veg',2004,'',5019);
insert into elef_item values (2077,1,'','Chocolate',249,'','','2077.jpg',1,'ns','non-veg',2004,'',5019);
insert into elef_item values (2078,0,'','Qubani Ka Meetha',107,'','','2078.jpg',1,'ns','veg',2004,'',5019);
insert into elef_item values (2079,1,'','Double Ka Meetha',73,'','','2079.jpg',1,'s','veg',2004,'',5019);


insert into elef_item values (2080,1,'','Diet Coke',150,'','','2080.jpg',1,'s','veg',2004,'',5020);
insert into elef_item values (2081,1,'','Thums Up',50,'','','2081.jpg',1,'ns','veg',2004,'',5020);
insert into elef_item values (2082,1,'','Mineral Water',45,'','','2082.jpg',1,'ns','veg',2004,'',5020);
insert into elef_item values (2083,1,'','Maaza',45,'','','2083.jpg',1,'ns','veg',2004,'',5020);
insert into elef_item values (2084,1,'','Sprite',45,'','','2084.jpg',1,'ns','veg',2004,'',5020);
insert into elef_item values (2085,1,'','Coke Tin',60,'','','2085.jpg',1,'ns','veg',2004,'',5020);
insert into elef_item values (2086,0,'','Fanta',45,'','','2086.jpg',1,'ns','veg',2004,'',5020);

insert into elef_item values (2087,1,'','Paneer 65',150,'','','2087.jpg',1,'s','veg',2004,'',5018);
insert into elef_item values (2088,1,'','Veg Manchurian',819,'','','2088.jpg',1,'ns','veg',2004,'',5018);



commit;








