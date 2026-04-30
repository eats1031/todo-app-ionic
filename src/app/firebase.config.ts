import { initializeApp } from 'firebase/app';

export const firebaseConfig = {
  apiKey: "AIzaSyA_eXwCdfeVICu4p20kvVzKLzn4k6llVHI",
  authDomain: "todo-app-ionic-67179.firebaseapp.com",
  projectId: "todo-app-ionic-67179",
  storageBucket: "todo-app-ionic-67179.firebasestorage.app",
  messagingSenderId: "983998997741",
  appId: "1:983998997741:web:d2eafbfd53d3e1a8fcd8e4"
};

export const firebaseApp = initializeApp(firebaseConfig);