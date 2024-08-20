<template>
<header>
    <div class="masthead">
        <h1><a class="identity-logo" href="https://creativecommons.org">Creative Commons</a></h1>
        <button class="expand-menu">Menu</button>
        <nav class="primary-menu">
            <ul>
                <li><a href="https://creativecommons.org/about/mission">Who We Are</a></li>
                <li><a href="https://creativecommons.org/about">What We Do</a></li>
                <li><a href="https://creativecommons.org/share-your-work">Licenses and Tools</a></li>
                <li><a href="https://creativecommons.org/blog">Blog</a></li>
                <li><a href="https://creativecommons.org/about/support-cc/">Support Us</a></li>
            </ul>
        </nav>

        <nav class="ancilliary-menu">
            <ul>
                <li><a class="search icon-attach fa-search" href="https://creativecommons.org/?s">Search</a></li>
                <li><a class="donate icon-attach fa-heart" href="https://www.classy.org/give/313412/#!/donation/checkout?c_src=website&c_src2=top-of-page-banner" target="_blank">Donate</a></li>
                <li><button class="explore">Explore CC</button></li>
            </ul>
        </nav>
    </div>



    <div class="explore-panel">

    <!-- (optional main CC logo, p, link on non-home site back to main site) -->
    <!-- <aside>
        <a class="identity-logo" href="#">Creative Commons</a>
        <h2>Our Work Relies On You!</h2>
        <p>Help us keep the internet free and open.</p>
    </aside> -->

    <nav class="explore-menu">
        <ul>
            <li>
                <a href="https://network.creativecommons.org/" target="_blank">Global Network</a>
                <p>Join a  global community working to strengthen the Commons</p>
            </li>
            <li>
                <a href="https://certificate.creativecommons.org/" target="_blank">Certificate</a>
                <p>Become an expert in creating and engaging with openly licensed materials</p>
            </li>
            <li>
                <a href="https://summit.creativecommons.org/" target="_blank">Global Summit</a>
                <p>Attend our annual event, promoting the power of open licensing</p>
            </li>
            <li>
                <a href="https://search.creativecommons.org/"  target="_blank">Search Portal</a>
                <p>Find engines to search openly licensed material for creative and educational reuse</p>
            </li>
            <li>
                <a href="https://opensource.creativecommons.org/" target="_blank">Open Source</a>
                <p>Help us build products that maximize creativity and innovation</p>
            </li>

        </ul>
    </nav>
    </div>

</header>


</template>

<script>
export default {
  name: 'HeaderSection',
  mounted() {
    const exploreButton = document.querySelector('button.explore');
    const explorePanel = document.querySelector('.explore-panel');

    exploreButton.addEventListener('click', (event) => {
      explorePanel.classList.toggle('expand');
    });

    const menuButton = document.querySelector('button.expand-menu');
    const menuPanel = document.querySelector('.primary-menu');

    menuButton.addEventListener('click', (event) => {
      menuPanel.classList.toggle('expand');
    });
  },
};
</script>


