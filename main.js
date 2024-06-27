// ADD BACKGROUND COLOR YELLOW FOR PAIRS CONTAINERS
const listContainer = document.querySelectorAll(".container");
listContainer.forEach((container, index) => {
  const isParContainer = (index + 1) % 2 === 0;
  if (isParContainer) {
    container.classList.add("container--bg-yellow");
  }
});

// EVENT FOR EACH LINK IN MENU
const listLinkMenu = document.querySelectorAll(".menu__link");
listLinkMenu.forEach((link) => {
  link.addEventListener("click", (event) => {
    // Remove a classe 'list__link--active' de todos os links
    removeActiveClassFromLinks();
    // Adiciona a classe 'list__link--active' apenas ao link clicado
    addActiveClassToLinks(link);
    // Impede o comportamento padrão do link (navegação)
    event.preventDefault();

    // Obtém o ID do alvo do link
    const targetId = link.getAttribute("href");
    // Rolagem suave para o elemento de destino
    smoothScrollToSection(targetId);
  });
});

const listSkills = document.querySelectorAll(".skill");
listSkills.forEach((skill) => {
  skill.addEventListener("click", () => {
    skill.classList.toggle("skill--active");
  });
});

// EVENT FOR CLOSE MENU WHEN CLICK IN TOUCH SCREEN
const touchScreen = document.getElementById("screen");
touchScreen.addEventListener("click", (event) => closeMenu(event));

const toggleMenu = document.getElementById("button__menu");
toggleMenu.addEventListener("click", () => changeMenuButtonIcon());

function removeActiveClassFromLinks() {
  listLinkMenu.forEach((link) => {
    link.classList.remove("menu__link--active");
  });
}

function addActiveClassToLinks(link) {
  link.classList.add("menu__link--active");
}

function smoothScrollToSection(targetId) {
  const targetElement = document.querySelector(targetId);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: "smooth" });
  }
}

function changeMenuButtonIcon() {
  const iconButtonMenu = document.getElementById("icon__toggleMenu");

  // Remove todas as classes do ícone
  iconButtonMenu.classList.remove("fa-x", "fa-bars");

  // Adiciona a classe apropriada com base no estado do toggleMenu
  iconButtonMenu.classList.add(toggleMenu.checked ? "fa-x" : "fa-bars");
}

function closeMenu(event) {
  const navMenu = document.getElementById("nav__menu");

  const isMenuOpen = toggleMenu.checked;

  // Verifica se o clique não ocorreu dentro do menu
  if (!navMenu.contains(event.target)) {
    // Fecha o menu
    if (isMenuOpen) {
      toggleMenu.checked = false;
      changeMenuButtonIcon();

      listLinkMenu.forEach((link, index) => {
        index === 0
          ? link.classList.add("menu__link--active")
          : link.classList.remove("menu__link--active");
      });
    }
  }
}

const clientWidth = window.innerWidth;
clientWidth > 768 ? changeProjectLink() : null;

function changeProjectLink() {
  const listProjectLink = document.querySelectorAll(".link__button--active");
  listProjectLink.forEach((link) => {
    link.classList.remove("link__button--active");
  });
}

const listShowTextProjectButton = document.querySelectorAll(
  ".showTextProjectButton"
);
listShowTextProjectButton.forEach((button) => {
  button.addEventListener("click", () => {
    const iconButton = button.children[0];
    if (iconButton.classList.contains("fa-eye")) {
      iconButton.classList.remove("fa-eye");
      iconButton.classList.add("fa-eye-slash");
    } else {
      iconButton.classList.remove("fa-eye-slash");
      iconButton.classList.add("fa-eye");
    }
  });
});

(function () {
  emailjs.init("7nk2QLQ9TOCVc8KsL");
})();
// Script for submit e-mail form
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Captura os dados do formulário
    const name = document.getElementById("insert--name").value;
    const email = document.getElementById("insert--email").value;
    const subject = document.getElementById("insert--subject").value;
    const message = document.getElementById("insert--message").value;

    // Configura os parâmetros para enviar
    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
      subject: subject,
    };

    // Envia o formulário usando a API EmailJS
    emailjs.send("service_ssw8k7n", "template_zvw7lz1", templateParams).then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
        alert("Mensagem enviada com sucesso!");
      },
      function (error) {
        console.log("FAILED...", error);
        alert("Ocorreu um erro ao enviar a mensagem.");
      }
    );
  });

// window.addEventListener("scroll", () => changeLinkMenuOnScroll());

// function changeLinkMenuOnScroll() {
//   const scrollPosition = window.scrollY;

//   listContainer.forEach((container, index) => {
//     const containerTop = container.offsetTop;
//     const containerHeight = container.clientHeight;
//     const containerId = container.getAttribute("id");

//     if (
//       scrollPosition >= containerTop - 1 &&
//       scrollPosition < containerTop + containerHeight
//     ) {
//       removeActiveClassFromLinks();
//       addActiveClassToLinks(document.querySelector(`[href="#${containerId}"]`));
//     }
//   });
// }
