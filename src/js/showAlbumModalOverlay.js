import disableScroll from './disableScroll';
import isMobile from './isMobile';

const showAlbumModalOverlay = ({albumPhotosSelector, albumModalOverlaySelector, albumModalOverlayImageSelector, albumModalOverlaySelectorClosedClass, albumModalOverlayHorizontalClass, albumModalOverlayImageHorizontalClass, prevButton, nextButton}) => {

   if(isMobile()) {
       return
   }


    if(albumModalOverlaySelector === undefined) {
        return
    }

    let photoIndex = null;

   /* const horizontalImageClass = 'album__image--horizontal';*/

    const albumPhotosSelectorArr = Array.prototype.slice.call(albumPhotosSelector);

    const changePhotosByuButtons = (photosArr) => {


        nextButton.addEventListener('click', () => {


            if(photoIndex < photosArr.length-1) {

                let photoSrc = photosArr[++photoIndex].getAttribute('src');
                albumModalOverlayImageSelector.setAttribute('src', photoSrc);

                prevButton.removeAttribute('style');
            }

            if(photoIndex === photosArr.length-1) {
                nextButton.style.visibility = 'hidden'
            }


        });

        prevButton.addEventListener('click', () => {

            if(photoIndex > 0) {

                let photoSrc = photosArr[--photoIndex].getAttribute('src');
                albumModalOverlayImageSelector.setAttribute('src', photoSrc);

                nextButton.removeAttribute('style');
            }

            if(photoIndex === 0) {
                prevButton.style.visibility = 'hidden'
            }
        })

    };

    albumPhotosSelectorArr.forEach((item, index) => {
        item.addEventListener('click', () => {

            /*if(item.classList.contains(horizontalImageClass)) {
                albumModalOverlaySelector.classList.add(albumModalOverlayHorizontalClass);
                albumModalOverlayImageSelector.classList.add(albumModalOverlayImageHorizontalClass);
            }*/

            photoIndex = index;

            let albumPhotoSrc = item.getAttribute('src');
            albumModalOverlayImageSelector.setAttribute('src', albumPhotoSrc);
            albumModalOverlaySelector.classList.remove(albumModalOverlaySelectorClosedClass);



            if(index === 0) {
                prevButton.style.visibility = 'hidden';
                nextButton.removeAttribute('style');
            }

            if (index === (albumPhotosSelectorArr.length -1)) {
                nextButton.style.visibility = 'hidden';
                prevButton.removeAttribute('style');
            }

            disableScroll(true)

        })
    });

    changePhotosByuButtons(albumPhotosSelectorArr);

    albumModalOverlaySelector.addEventListener('click', (e) => {
        let target = e.target;

        if( target.className === 'album-modal-overlay js-album-modal-overlay') {
            albumModalOverlaySelector.classList.add(albumModalOverlaySelectorClosedClass);
            photoIndex = null;

            disableScroll(false)
        }
    });
};

export default showAlbumModalOverlay;