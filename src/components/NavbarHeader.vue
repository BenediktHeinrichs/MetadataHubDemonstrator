<template>
  <div>
    <b-navbar toggleable="lg" class="bg-dark" data-bs-theme="dark">
      <router-link v-slot="{ href }" to="/" custom>
        <b-navbar-brand :href="href">MetadataHub Demonstrator</b-navbar-brand>
      </router-link>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ms-auto">
          <b-navbar-brand href="https://nfdi4ing.de/">
            <img
              class="nfdi4ingLogo"
              src="@/assets/logo_nfdi4ing_white_quer.svg"
              alt="NFDI4Ing Logo"
              data-themekey="#"
            />
          </b-navbar-brand>
          <b-nav-item href="https://nfdi4ing.de/base-services/s-3/"
            ><i-bi-info-circle
          /></b-nav-item>
          <b-nav-item href="https://git.rwth-aachen.de/nfdi4ing/s-3/s-3-3"
            ><i-bi-code-slash
          /></b-nav-item>
          <b-nav-item-dropdown>
            <template #button-content>
              <i-bi-circle-half />
              <span class="d-lg-none ms-2">Toggle theme</span>
            </template>
            <b-dropdown-item-button
              data-bs-theme-value="light"
              @click="setMode('light')"
              ><i-bi-sun-fill class="me-2 opacity-50 theme-icon" />
              Light
              <i-bi-check2 class="ms-auto d-none"
            /></b-dropdown-item-button>
            <b-dropdown-item-button
              data-bs-theme-value="dark"
              @click="setMode('dark')"
              ><i-bi-moon-stars-fill class="me-2 opacity-50 theme-icon" />
              Dark
              <i-bi-check2 class="ms-auto d-none"
            /></b-dropdown-item-button>
            <b-dropdown-item-button
              data-bs-theme-value="auto"
              @click="setMode('auto')"
              ><i-bi-circle-half class="me-2 opacity-50 theme-icon" />
              Auto
              <i-bi-check2 class="ms-auto d-none"
            /></b-dropdown-item-button>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script lang="ts">
type Theme = "light" | "dark" | "auto";

export default defineComponent({
  name: "NavbarHeader",
  mounted() {
    // From: https://getbootstrap.com/docs/5.3/customize/color-modes/#javascript
    const storedTheme: Theme | null = localStorage.getItem(
      "theme",
    ) as Theme | null;

    this.setTheme(this.getPreferredTheme(storedTheme));

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", () => {
        if (storedTheme !== "light" && storedTheme !== "dark") {
          this.setTheme(this.getPreferredTheme(storedTheme));
        }
      });

    window.addEventListener("DOMContentLoaded", () => {
      this.showActiveTheme(this.getPreferredTheme(storedTheme));
    });
  },
  methods: {
    getPreferredTheme(storedTheme: Theme | null) {
      if (storedTheme) {
        return storedTheme;
      }

      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    },
    setMode(theme: Theme | null) {
      if (theme !== null) {
        localStorage.setItem("theme", theme);
        this.setTheme(theme);
        this.showActiveTheme(theme);
      }
    },
    setTheme(theme: Theme) {
      if (
        theme === "auto" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        document.documentElement.setAttribute("data-bs-theme", "dark");
      } else {
        document.documentElement.setAttribute("data-bs-theme", theme);
      }
    },
    showActiveTheme(theme: Theme) {
      const activeThemeIcon = document.querySelector(".theme-icon-active use");
      const btnToActive = document.querySelector(
        `[data-bs-theme-value="${theme}"]`,
      );
      if (btnToActive !== null && activeThemeIcon !== null) {
        const svgQuery = btnToActive.querySelector("svg use");
        if (svgQuery !== null) {
          const svgOfActiveBtn = svgQuery.getAttribute("href");

          if (svgOfActiveBtn !== null) {
            document
              .querySelectorAll("[data-bs-theme-value]")
              .forEach((element) => {
                element.classList.remove("active");
              });

            btnToActive.classList.add("active");
            activeThemeIcon.setAttribute("href", svgOfActiveBtn);
          }
        }
      }
    },
  },
});
</script>

<style scoped>
.profileImage {
  height: 40px;
  margin-top: -8px;
  margin-bottom: -8px !important;
}
.navbar a img.nfdi4ingLogo {
  border: 0px;
  object-position: 0%;
  width: 74px;
  height: 30px;
}
.bg-dark :deep(.navbar-toggler-icon) {
  mix-blend-mode: color-dodge !important;
}
</style>

<style>
.navbar-toggler-icon {
  mix-blend-mode: color-burn;
}
</style>
