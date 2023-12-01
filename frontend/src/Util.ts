export const formatDate = (inputTimeString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const inputDate = new Date(inputTimeString);
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(inputDate);

  return formattedDate;
};

export const compareDates = (a: string, b: string) => {
  const date1 = new Date(a)
  const date2 = new Date(b)
  if (date1 > date2) {
    return -1
  }
  else if (date1 < date2) {
    return 1
  }
  else {
    return 0
  }
}

export const defaultDate = (inputTimeString: string): string => {
  const inputDate = new Date(inputTimeString);
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  };
  
  return inputDate.toLocaleString('en-US', options);
};
