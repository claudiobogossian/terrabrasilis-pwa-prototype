
document.addEventListener("DOMContentLoaded", () => {	

	if ('serviceWorker' in navigator) {
		navigator.serviceWorker
		  .register('/sw.js')
		  .then(serviceWorker => {
			const data = {
                type: 'CACHE_URLS',
                payload: [
                    location.href,
                    ...performance.getEntriesByType('resource').map((r) => r.name)
                ]
            };
            serviceWorker.active.postMessage(data);
			console.log('Service Worker registered: ' + serviceWorker);
		  })
		  .catch(error => {
			console.log('Error registering the Service Worker: ' + error);
		  });
	  }

});

function loadJSON()
{
    fetch('data/deter-amazon-daily.json').then(response=>response.json())
    .then(data=>{
       let jsonText = JSON.stringify(data)
       $('#fetch-result').text(jsonText)
    })
}