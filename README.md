# Code-Cafe

* User registers 

* User logs in

* User is brought to home page

* User is able to choose cafe by either entering their zip code in the query field or choosing a filter option

* If the user choses by zip code, a list populates of cafes to go in that area to study or code 

* If user choses by filter, they will be directed to a page where they can select different criteria of where they would like to work.

* After filtering through their criteria, they will be directed to a page of cafes that meet their specific needs. 

* On the pages where the cafes are listed, under each cafe there is a "review button" where users can read reviews of cafes supplied by other users of the app. Users can also include their own reviews of cafes as well! 

* User will be able to create, read, update and delete their comments and reviews of a coffee shop or cafe.

* Our app will include Google Places!  

* User model, CRUD 

* Related model, Using the API, and cafe database 

```
User Schema 
	Username: String
	Password:  String 

Places Schema
	
  Name: String 
  placeId: place_id from google places api
  Price: from google places api
  Outlets: Boolean
		How Many: Null 
  Wifi: Boolean 
  Drink Options
	    	- Caffeinated drinks: Boolean
 	   	- Alcohol: Boolean
	Food Options
	    - Food allergies
		dinner: boolean
		lunch: boolean
		gf: boolean
		vegan: boolean   
	Seating
  	  - Comfortable chairs: Boolean
  	  - Outdoor seating: Boolean
	Atmosphere
	    - How busy it is: String 
	    - Small business or large corporation: String
	    - Lighting: String
	Atmosphere: [‘stuffy’, relaxed, hip, jazzy]  
	Atmosphere desc: Text { lorem ipsum }
	Music: [‘jazz’, ‘soft’, ‘energizing’, ‘folksy’, ‘metal’]
	Music desc: Text 

  //use controller to calculate this on the fly by looking at hours from google API result
	Hours of Operation : We decide what it means to be open early or late 
	
	


Review Schema
	Name of reviewer: 
	Place:  Object ID (‘Place’) 
	text: Text { }
	timestamp:
	recommend: Boolean
	rating: Number
```
  ![Beginning]
  (https://imgur.com/3YbWQCv)
  
  ![End] 
  (https://imgur.com/0V3Ipjd)
  
