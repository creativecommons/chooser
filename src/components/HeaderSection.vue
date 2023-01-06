<template>
  <header>
    <nav class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <a class="logo" aria-current="page" href="/">
            <img
              src="@creativecommons/cc-assets/logos/products/chooser.svg"
              alt="Creative Commons License chooser"
              height="40"
              width="169"
            />
          </a>
          <a
            role="button"
            aria-label="menu"
            aria-expanded="false"
            class="navbar-burger"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>
        <div class="navbar-menu navbar-end">
         
        </div>
      </div>
    </nav>
  </header>
</template>

<script>

</script>

<style lang="scss">
#app .navbar {
  padding: 0.5rem 0 0;
}
.navbar-burger {
  background-color: white;
}
.navbar-item.navbar-item-feedback {
  font-size: 1rem;
  font-weight: bold;
  color: #787878;
  transition: color 300ms ease;
  &:hover {
    color: #fb7729;
    background-color: white;
  }
}
</style>
