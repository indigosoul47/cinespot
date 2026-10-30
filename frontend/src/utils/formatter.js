export const formatDate = (dateString) => {
    return dateString ? (new Date(dateString)).toDateString() : '';
  }

export const formatTime = (dateString) => {
    return dateString ? (new Date(dateString)).toTimeString() : '';
}

export const formatPrice = (num) => {
    return num ? num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : '';
}