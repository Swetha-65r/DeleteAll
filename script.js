// script.js

const BASE_URL = "http://localhost:5000/data";

const data = [
  { id: "1", name: "suresh" },
  { id: "2", name: "Rajesh" },
  { id: "3", name: "ramesh" },
  { id: "4", name: "Mahesh" }
];
// POST ALL //
function postAllData() {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  };

  for (let i = 0; i < data.length; i++) {
    const obj = data[i];

    fetch(BASE_URL, {
      ...options,
      body: JSON.stringify(obj)
    })
      .then(res => {
        if (res.ok) {
          console.log("Posted:", obj.id, obj.name);
        } else {
          console.log("Data Not Posted for id:", obj.id);
        }
      })
      .catch(err => console.error("Error posting id:", obj.id, err));
  }
}

// DELETE ALL 
function deleteAllData() {
  fetch(BASE_URL)
    .then(res => {
      if (!res.ok) {
        throw new Error("Failed to load data");
      }
      return res.json();
    })
    .then(items => {
      if (!Array.isArray(items) || items.length === 0) {
        console.log("No data to delete");
        return;
      }

      const deletePromises = items.map(item =>
        fetch(`${BASE_URL}/${item.id}`, { method: "DELETE" })
          .then(res => {
            if (res.ok) {
              console.log("Deleted:", item.id, item.name);
            } else {
              console.log("Not deleted:", item.id);
            }
          })
      );

      return Promise.all(deletePromises);
    })
    .then(() => console.log("Delete-all finished"))
    .catch(err => console.error("Error in deleteAllData:", err));
}

