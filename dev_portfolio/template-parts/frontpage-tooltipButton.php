<div class="tooltipButton__container">
  <div class="tooltipButton__tooltip tooltip right">Curious about how something works? Click this icon to reveal which
    parts of my code you can learn more about.
  </div>
  <div class="tooltipButton__button" onClick="codeModal.switchTooltips()">

    <svg>
      <use xlink:href="<?php echo get_template_directory_uri().'/images/symbol.svg#icon-search'; ?>"></use>
    </svg>


  </div>
  <div class="code__tooltip tooltipButton__codeTooltip tooltip up blue" onClick="codeModal.show(28)">The Code Modal
  </div>
</div>