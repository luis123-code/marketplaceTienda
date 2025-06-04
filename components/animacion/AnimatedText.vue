<template>
  <h1 class="ml6">
    <span class="text-wrapper">
      <span class="letters">{{ text }}</span>
    </span>
  </h1>
</template>

<script>
export default {
  name: 'AnimatedText',
  props: {
    text: {
      type: String,
      default: 'Animación de Texto'
    }
  },
  mounted() {
    const anime = window.anime
    const textWrapper = this.$el.querySelector('.letters')

    if (!textWrapper) return

    // Envolver cada letra en un span con clase 'letter'
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>")

    // Animación solo una vez, sin loop ni desaparición
    anime.timeline()
      .add({
        targets: '.ml6 .letter',
        translateY: ["1.2em", 0],
        opacity: [0, 1],
        duration: 1400,
        delay: (el, i) => 80 * i,
        easing: "easeOutExpo"
      })
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styleGeneral.scss';
@import '../../assets/iconStyle.scss';
.ml6 {
  position: relative;
  font-weight: 400;
  font-size: 35px;
  line-height: 100%;
}

.ml6 .text-wrapper {
  position: relative;
  display: inline-block;
  padding-top: 0.2em;
  padding-right: 0.05em;
  padding-bottom: 0.1em;
  overflow: hidden;
}

.ml6 .letter {
  display: inline-block;
  line-height: 1em;
}
</style>
