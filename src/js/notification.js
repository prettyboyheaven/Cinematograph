import firebase from 'firebase';

let config = {
    apiKey: "AIzaSyCaP3DNqjHDcHBOlaQkQW1klPDE9PdcZOo",
    authDomain: "cinematograph-2c5b2.firebaseapp.com",
    databaseURL: "https://cinematograph-2c5b2.firebaseio.com/",
    projectId: "cinematograph-2c5b2",
    storageBucket: "cinematograph-2c5b2.appspot.com",
    messagingSenderId: "854998265633"
};

firebase.initializeApp(config);
const messaging = firebase.messaging();




const notifcation = () => {

    messaging.requestPermission().then(function() {
        console.log('Notification permission granted.');
        // TODO(developer): Retrieve an Instance ID token for use with FCM.
        return messaging.getToken();
        // ...
    })
    .then(function (token) {
        console.log(token);
    })
    .catch(function(err) {
        console.log('Unable to get permission to notify.', err);
    });

    messaging.onMessage(function (payload) {
        console.log('onMessage', payload)
    });
   /* if (!('serviceWorker' in navigator)) {
        // Браузер не поддерживает сервис-воркеры.
        return;
    }

    if (!('PushManager' in window)) {
        // Браузер не поддерживает push-уведомления.
        return;
    }

    let key = 'BP5xy530cEfpf1lqLLRg5IToSZu5or9K9yx6tkpjTlTN-UCebqxQdYIma0npq1GPB4pp-2wTPLpNJTD88UkJxrc';

    function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    function requestPermission() {
        return new Promise(function(resolve, reject) {
            const permissionResult = Notification.requestPermission(function(result) {
                // Поддержка устаревшей версии с функцией обратного вызова.
                resolve(result);
            });

            if (permissionResult) {
                permissionResult.then(resolve, reject);
            }
        })
            .then(function(permissionResult) {
                if (permissionResult !== 'granted') {
                    throw new Error('Permission not granted.');
                }
            });
    }

    function subscribeUserToPush() {
        return navigator.serviceWorker.register('firebase-messaging-sw.js')
            .then(function(registration) {
                let subscribeOptions = {
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(key)
                };

                return registration.pushManager.subscribe(subscribeOptions);
            })
            .then(function(pushSubscription) {
                console.log('PushSubscription: ', JSON.stringify(pushSubscription));
                return pushSubscription;
            });
    }

    const notifyApiUrl  = `${window.location.origin}/api/subscribeToNotify`;

    requestPermission()
        .then(() => subscribeUserToPush())
        .then(pushSubscription => {

                let data = new FormData();

                data.append("pushSubscription", JSON.stringify(pushSubscription));

                let xhr = new XMLHttpRequest();
                xhr.open("POST", notifyApiUrl);
                xhr.send(data);
            })*/

};

export default notifcation;