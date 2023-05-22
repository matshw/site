const accordionTitulos = document.querySelectorAll(".accordion-titulo");

accordionTitulos.forEach(accordionTitulo => {
  accordionTitulo.addEventListener("click", event => {
    const AccordionTituloAtivo = document.querySelector(".accordion-titulo.active");
    if(AccordionTituloAtivo && AccordionTituloAtivo!==accordionTitulo) {
      AccordionTituloAtivo.classList.toggle("active");
      AccordionTituloAtivo.nextElementSibling.style.maxHeight = 0;
    }

    accordionTitulo.classList.toggle("active");
    const accordionConteudo = accordionTitulo.nextElementSibling;
    if(accordionTitulo.classList.contains("active")) {
      accordionConteudo.style.maxHeight = accordionConteudo.scrollHeight + "px";
    }
    else {
      accordionConteudo.style.maxHeight = 0;
    }
    
  });
});