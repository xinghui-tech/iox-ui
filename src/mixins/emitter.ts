/**
 * copy from b-vue/src/emitter.js
 */
import Vue from 'vue';

function broadcast(this: Vue, componentName: string | string[], eventName: string, params: any) {
  let componentNames: string[] = [];
  if (typeof componentName === 'string') {
    componentNames.push(componentName);
  } else {
    componentNames = componentName;
  }

  this.$children.forEach( (child: Vue) => {
    const name = child.$options.name;

    if (name && componentNames.indexOf(name) >= 0) {
      // eslint-disable-next-line prefer-spread
      child.$emit.apply(child, [eventName].concat([params]) as [string, any[]]);
    } else {
      broadcast.apply(child,
        [componentName, eventName].concat([params]) as [string | string[], string, any]);
    }
  });
}

export default Vue.extend({
  methods: {
    $$dispatch(componentName: string | string[], eventName: string, params: any) {
      let parent = this.$parent || this.$root;
      let name = parent.$options.name;
      let componentNames: string[] = [];
      if (typeof componentName === 'string') {
        componentNames.push(componentName);
      } else {
        componentNames = componentName;
      }

      while (parent && (!name || componentNames.indexOf(name) < 0)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.name;
        }
      }
      if (parent) {
        // eslint-disable-next-line prefer-spread
        parent.$emit.apply(parent, [eventName].concat([params]) as [string, any[]]);
      }
    },
    $$broadcast(componentName: string | string[], eventName: string, params: any) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
});
