<div id="projectGallery" class="projectGallery">
  <h2>Projects</h2>
  <div id="projectGallery__projects" class="projectGallery__projects">
    <div class="projectGallery__project" v-for="(project,index) in projects" key="index">
      <div class="projectGallery__projectFront">
        <img class="projectGallery__projectImage margin bottom tiny" :src="project.image" alt="project image">
        <div class="projectGallery__projectTitleContainer margin bottom small">
          <h3 class="projectGallery__projectTitle">{{project.title}}</h3>
          <div class="projectGallery__projectMenu" @click="showBack('projectBack'+project.id)">
            <div class="projectGallery__projectMenuButton"></div>
          </div>
        </div>

        <p class="projectGallery__projectSummary">{{project.summary}}</p>
      </div>

      <div class="projectGallery__projectBack" :id="'projectBack'+project.id">
        <div class="projectGallery__projectCloseButton closeButton" @click="hideBack('projectBack'+project.id)"></div>

        <h3 class="projectGallery__projectHighlights">Highlights</h3>
        <ul class="projectGallery__projectHighlightsList">
          <li class="projectGallery__projectHighlightsItem" v-for="(highlight, index) in project.highlights"
            key="index">
            {{highlight}}</li>
        </ul>
        <div class="projectGallery__projectLinks">
          <a :href="project.demo_link" class="projectGallery__demoLink">
            <svg>
              <use xlink:href="<?php echo get_template_directory_uri().'/images/symbol.svg#icon-new-tab'; ?>"></use>
            </svg>
          </a>
          <a :href="project.github_link" class="projectGallery__githubLink"><svg>
              <use xlink:href="<?php echo get_template_directory_uri().'/images/symbol.svg#icon-github'; ?>"></use>
            </svg> </a>
        </div>
      </div>
    </div>

  </div>
</div>