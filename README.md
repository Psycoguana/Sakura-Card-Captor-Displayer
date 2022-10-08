# Sakura Card Displayer

Alright, who hasn't watched Sakura Card Captor in their childhood? I certainly did, and I loved it ❤️
This website grabs the beautiful card art from this loved manga/anime and display it onto a 3D object, almost making it look like you can reach and grab them (well, maybe not that much, but it's still really cool)

I've been wanting to try THREE.js for a while now and when I heard about a public Sakura Card Captor API and decided to give it a go 😁

Check it out here (better on mobile): https://sakura-card-captor-displayer.vercel.app/

## Preview
<img src="./preview.gif" width="350" height="650" />

# Tools I Used
* [React](https://reactjs.org/)
* [Vite](https://vitejs.dev/)
* [THREE.js](https://github.com/mrdoob/three.js/)
* [Bootstrap](https://getbootstrap.com/) and [React Bootstrap](https://react-bootstrap.github.io/)
* [Sakura Card Captor API](https://github.com/JessVel/sakura-card-captor-api)

# Some of the things I learned

## THREE.js
* There seems to be lots of versions, it was very common to have a problem, just to find very different ways of doing things depending on the library's version.
* Don't remove the background of the object until it's ready. I had some long lasting issues regarding the size of the canvas which I easily solved once I re enabled the canvas black background.

## Vite
* I heard a lot of people comparing create-react-app vs vite, and vite always winning. One of the points was speed. I'm still making simple stuff, but I've noticed that when starting a server created with create-react-app I have to wait quite a while. I decided to give vite a try and I don't regret it, I can easily notice a significant speedup.
