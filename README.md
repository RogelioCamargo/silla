## Silla Project
Silla is a marketplace for used furniture. A user can sign in via google and once logged in, the app requests the user's location to get
items closest to him. A user can search for items and message others about said items. A user can also post and update items. A profile can be updated as well.

Services and Technoglogies Used: 
1. React Native (frontend)
2. Node.js (backend)
3. AWS S3 (storing images)
4. Socket.IO (messaging)
5. MongoDB and mongoose (database and schema design)


I really wish I recorded more video of my project. This is an app I still intend to launch in the future, 
but just not right now.

### 1. Google Login/Signup
A user can log in or sign up with their google creditials.

<img src="/demo/login.jpg" alt="login screen" style="width: 250px;"/>

### 2. Explore Page/Home
A user will have a better idea what to look for by displaying popular categories. 

<img src="demo/home.jpeg" alt="home screen" style="width: 250px;"/>
![RPReplay-Final1616900069](https://user-images.githubusercontent.com/19900547/146804203-d89eeb31-bddc-4622-9cd9-2718d0fcebd0.gif)

### 2. Messaging
Users can send messages to each other about a particular item. 
This is done with web sockets.

<img src="/demo/message.jpeg" alt="conversation example" style="width: 250px;"/>

### 3. Creating/Updating/Deleteing Posts
Users can create posts. Images are stored in a AWS S3 bucket and all other 
post details are stored in a standard NoSQL database-- MongoDB. This includes
Image URLs that are autogenerated form AWS S3. 

<div style="display: flex">
  <img src="/demo/create-post-1.jpg" alt="create post screen 1" style="width: 250px;">
  <img src="/demo/create-post-2.jpg" alt="create post screen 2" style="margin-left: 25px; width: 250px;">
</div>

### 4. Creating/Updating Profile
A user profile is created upon signing up and can be updated in the profile
screen. 

### 5. Search
Users can search through items via keywords or phrases. 

### 6. Demo!
https://youtu.be/48k8AMLut2U





