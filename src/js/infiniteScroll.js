const infiniteScroll = () => {



    function debounce(f, ms) {

        let state = null;

        let COOLDOWN = 1;

        return function () {
            if (state) return;

            f.apply(this, arguments);

            state = COOLDOWN;

            setTimeout(function () {
                state = null
            }, ms);
        }

    }


    let onWheel = function (e) {
        e = e || window.event;

        let delta = e.deltaY || e.detail || e.wheelDelta;
        let number = 0;

        if (delta >= number ) {
            preloader.style.display = 'block';
            getData()
        }

    };

    let getDataOnScroll = debounce(function(e){

        onWheel(e);

    }, 1000);



    let newsList = document.getElementsByClassName('js-gallery-video-list')[0];
    let preloader = document.getElementsByClassName('js-preloader')[0];
    let body = document.body;


    let url = 'https://newsapi.org/v2/top-headlines?' + 'sources=bbc-news&' + 'apiKey=1aa994764e434bc991ceb52fa10cdf5d';

    let req = new Request(url);

    const getData = () => {
        fetch(req)
            .then(
                (response) => {

                   response.json().then(data => {


                       for(let i = 0; i < data.articles.length; i++) {
                           console.log(data.articles[i]);
                           let item = document.createElement('li');
                           let itemLink = document.createElement('a');
                           let itemImage = document.createElement('img');
                           let itemTitleContainer = document.createElement('div');
                           let itemTitle = document.createElement('h3');
                           let itemMark = document.createElement('mark');
                           item.classList.add('gallery__item');
                           item.classList.add('gel-layout__item');
                           item.classList.add('gel-5-10-xl');
                           itemLink.classList.add('gallery__large-card');
                           itemLink.classList.add('large-card');
                           itemImage.classList.add('large-card__image');
                           itemTitleContainer.classList.add('large-card__title-container');
                           itemTitle.classList.add('large-card__title');
                           itemMark.classList.add('large-card__highlight');

                           itemTitle.appendChild(itemMark);
                           itemTitleContainer.appendChild(itemTitle);

                           itemLink.appendChild(itemImage);
                           itemLink.appendChild(itemTitleContainer);

                           itemMark.innerText = data.articles[i].author + [i];

                           itemLink.setAttribute('href', data.articles[i].url);
                           itemImage.setAttribute('src', data.articles[i].urlToImage);

                           item.appendChild(itemLink);
                           newsList.appendChild(item);
                           preloader.style.display = 'none';
                       }
                   })



                }
            )
    };
    

    getData();



    document.addEventListener('wheel',  () =>  {

        getDataOnScroll();

    })


};

export default infiniteScroll;