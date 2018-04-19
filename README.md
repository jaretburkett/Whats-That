## What's That

#### Tensorflow.js webcam video stream classifier in the browser. 

# Want to see it?
## [Check out the Demo](https://jaretburkett.github.io/Whats-That/ "What's That")

### What is it

The Tensor flow team has recently released Tensorflow.js. It is a port
of Tensorflow that uses WebGL and Javascript to run as opposed to Cuda and Python. 
What this means is, we can now make websites that utilize machine learning and can run
models, in the browser. 

This project is based on the [mobilenet](https://github.com/tensorflow/tfjs-examples/tree/master/mobilenet) example 
provided by the tensorflow team. I added some extra sugar to it by using React, and capturing the image in real time and
running it through the model. This leaves you with real time image classification. 

No, this isnt pretty. It is just a test project to test out the library. So far I am impressed. 


### Development

If you want to run this for yourself, make sure you have upgraded node to > v8.9 and install yarn;

```
npm install yarn -g
```

Then run a simple 

```
yarn
```

and then 

```
yarn start
```

Viola, you are now a professional developer. 
