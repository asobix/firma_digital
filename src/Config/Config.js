const CONFIG = {
    environment: {
        name: process.env.REACT_APP_VITE_ENVIRONMENT,
        company: process.env.REACT_APP_COMPANY,
        htmlTitle: process.env.REACT_APP_HTML_TITLE,
		htmlFavicon: `${process.env.PUBLIC_URL}${process.env.REACT_APP_UTL_HTML_FAVICON}`,
    },
    services: {
        upload: `${process.env.REACT_APP_DOCUMENT_UPLOAD}/upload`,
        getCustomerInformation: `${process.env.REACT_APP_BASE_ENDPOINT}digital_signature/get_customer_information`,
        serverImageExists: `${process.env.REACT_APP_BASE_ENDPOINT}digital_signature/server_image_exists`,
        saveImage: `${process.env.REACT_APP_BASE_ENDPOINT}digital_signature/save_image`
    }
}

export default CONFIG