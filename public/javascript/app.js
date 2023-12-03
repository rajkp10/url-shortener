const url = document.querySelector("#url");
const errorMessage = document.querySelector("#errorMessage");
const shortenLink = document.querySelector("#shortenLink");
const shortenBtn = document.querySelector("#shortenBtn");
const copyBtn = document.querySelector("#copyBtn");
const shortUrlSection = document.querySelectorAll(".shortUrl");
const loader = document.querySelector("#loader");

const isUrl = (url) => {
  try {
    new URL(url);
  } catch (error) {
    return false;
  }
  return true;
};

shortenBtn.addEventListener("click", async () => {
  loader.classList.remove("d-none");
  if (!isUrl(url.value)) {
    loader.classList.add("d-none");
    url.classList.add("is-invalid");
    errorMessage.textContent = "Enter a valid Url.";
    return;
  } else {
    url.classList.remove("is-invalid");
    errorMessage.textContent = "";
  }
  await fetch("http://localhost:5000/shorten", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ originalUrl: url.value }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        url.classList.add("is-invalid");
        errorMessage.textContent = data.error;
        shortUrlSection.forEach((node) => node.classList.add("d-none"));
      } else {
        const shortUrl = data.shortUrl;
        shortenLink.setAttribute("href", shortUrl);
        shortenLink.textContent = shortUrl;
        shortUrlSection.forEach((node) => node.classList.remove("d-none"));
        url.value = "";
      }
    })
    .catch((err) => console.log(err));
  loader.classList.add("d-none");
});

copyBtn.addEventListener("click", () => {
  const copyText = shortenLink.getAttribute("href");
  console.log(copyText);
  navigator.clipboard.writeText(copyText);
  let toolTip = bootstrap.Tooltip.getInstance("#copyBtn");
  toolTip._config.title = "Copied!";
  toolTip.hide();
  toolTip.update();
  setTimeout(() => toolTip.show(), 200);
});
