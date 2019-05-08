<template>
  <div class="footer">
    <div class="social">
      <a class="icon-twitter" title="Twitter" href="#">
        <font-awesome-icon :icon="['fab', 'twitter']"/>
      </a>
      <a class="icon-facebook" title="Facebook" href="#">
        <font-awesome-icon :icon="['fab', 'facebook']"/>
      </a>
      <a class="icon-github" title="Github" href="#">
        <font-awesome-icon :icon="['fab', 'github']"/>
      </a>
    </div>

    <p>&copy; OLI Systems GmbH</p>
  </div>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style >
.footer {
  text-align: center;
  background-color: #404040;

  color: rgb(228, 222, 222);
}
.footer .social {
  padding-top: 1.5em;
}

.footer .social a {
  display: inline-block;
  overflow: hidden;
  width: 20px;
  height: 20px;
  margin: 0 10px;
}

#app div.footer .social > a > svg {
  width: 20px;
  height: 20px;
}

#app > div.footer .social > a.icon-facebook > svg:hover {
  color: #3d5b99;
}

#app > div.footer .social > a.icon-twitter > svg:hover {
  color: #00aced;
}

#app > div.footer .social > a.icon-github > svg:hover {
  color: #86888b;
}

#app div.footer .social > a {
  color: white;
  padding: 0;
}
</style>
