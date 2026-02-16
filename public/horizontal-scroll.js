console.log("horizontal scroll script loaded");
const section = document.querySelector(".horizontal");
const track = document.querySelector(".horizontal__track");
const footer = document.querySelector(".footer");
console.log("section:", section);
console.log("track:", track);

if (section && track) {
  window.addEventListener("scroll", () => {
    
    const rect = section.getBoundingClientRect();
    console.log("rect:", rect);

    const totalWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth;

    const maxTranslate = totalWidth - viewportWidth + window.innerWidth * 0.036;

    const scrollLength = section.offsetHeight - window.innerHeight;

    console.log("section.offsetHeight", section.offsetHeight);
    console.log("window.innerHeight", window.innerHeight);
    console.log("scrollLength:", scrollLength);
    const progress = Math.min(Math.max(-rect.top / scrollLength, 0), 1);
    console.log(progress);

    track.style.transform = `translateX(${-progress * maxTranslate}px)`;
    footer.scrollIntoView({
      behavior: "smooth", // Makes the transition smooth
    });
  });
}
