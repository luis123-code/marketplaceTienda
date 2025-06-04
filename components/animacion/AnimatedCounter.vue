<template>
  <p id="counter" style="font-weight: 400; font-size: 33px; text-align: end;">
    <slot :number="displayedNumber">
      {{ displayedNumber }}
    </slot>
  </p>
</template>

<script>
export default {
  name: "AnimatedCounter",
  data() {
    return {
      displayedNumber: 0,
    };
  },
  props: {
    endValue: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 1500,
    },
  },
  mounted() {
    this.animateNumber();
  },
  methods: {
    animateNumber() {
      const startTime = performance.now();
      const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / this.duration, 1);
        this.displayedNumber = Math.floor(progress * this.endValue);
        if (progress < 1) {
          requestAnimationFrame(update);
        }
      };
      requestAnimationFrame(update);
    },
  },
};
</script>
