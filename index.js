function renderRequestsList(item) {
  const videoRequestContainer = document.createElement('div')
  videoRequestContainer.innerHTML = `<div class="card mb-3">
          <div class="card-body d-flex justify-content-between flex-row">
            <div class="d-flex flex-column">
              <h3>${item.topic_title}</h3>
              <p class="text-muted mb-2">${item.topic_details}</p>
              <p class="mb-0 text-muted">
                <strong>Expected results:</strong> ${item.expected_result}
              </p>
            </div>
            <div class="d-flex flex-column text-center">
              <a class="btn btn-link">🔺</a>
              <h3>0</h3>
              <a class="btn btn-link">🔻</a>
            </div>
          </div>
          <div class="card-footer d-flex flex-row justify-content-between">
            <div>
              <span class="text-info">${item.status.toUpperCase()}</span>
              &bullet; added by <strong>${item.author_name}</strong> on
              <strong>${new Date(item.submit_date).toLocaleDateString()}</strong>
            </div>
            <div
              class="d-flex justify-content-center flex-column 408ml-auto mr-2"
            >
              <div class="badge badge-success">
                ${item.target_level}
              </div>
            </div>
          </div>
        </div>`
  return videoRequestContainer
}

document.addEventListener("DOMContentLoaded", () => {
  const formElem = document.getElementById("form-data");

  const videoRequestElem = document.getElementById("listOfRequests");
  fetch("http://localhost:7777/video-request").then(res => res.json()).then(items => {
    items.forEach(item => {
      videoRequestElem.appendChild(renderRequestsList(item));
    })
  })
  formElem.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(formElem);

    fetch("http://localhost:7777/video-request", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author_name: formData.get("author_name"),
        author_email: formData.get("author_email"),
        topic_title: formData.get("topic_title"),
        target_level: formData.get("target_level"),
        topic_details: formData.get("topic_details"),
        expected_result: formData.get("expected_result"),
      }),
    });
  });
});
