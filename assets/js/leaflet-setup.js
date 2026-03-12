/* Create leaflet map as another node and hide the code block, appending the leaflet node after it */
window.addEventListener("load", () => {
  document.querySelectorAll("pre>code.language-geojson").forEach((elem) => {
    const jsonData = elem.textContent;
    const backup = elem.parentElement;
    backup.classList.add("unloaded");

    let mapElement = document.createElement("div");
    mapElement.classList.add("map");
    backup.after(mapElement);

    var map = L.map(mapElement);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    let geoJSON = L.geoJSON(JSON.parse(jsonData)).addTo(map);
    var bounds = geoJSON.getBounds();
    if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
      map.setView(bounds.getCenter(), 15);
    } else {
      map.fitBounds(bounds);
    }
    map.invalidateSize();
    setTimeout(() => map.invalidateSize(), 300);
  });
});
