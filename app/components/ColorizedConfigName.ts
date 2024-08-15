export default defineComponent({
  props: {
    name: {
      type: String,
    },
    index: {
      type: Number,
    },
  },
  setup(props) {
    const parts = computed(() => {
      const splitted = props.name?.split(/([:/])/g).filter(Boolean)

      const [scope, scopeSeparator, moduleName, ...rest] = splitted || []

      if (scope.startsWith('@') && scopeSeparator && moduleName) {
        return [scope + scopeSeparator + moduleName, ...rest]
      }

      return splitted
    })

    return () => {
      if (parts.value) {
        return h('span', parts.value.map((part, i) => h(
          'span',
          [':', '/'].includes(part)
            ? { style: { opacity: 0.35, margin: '0 1px' } }
            : i !== parts.value!.length - 1
              ? { style: { color: getPluginColor(part) } }
              : null,
          part,
        )))
      }
      else {
        return h('span', [
          h('span', { class: 'op50 italic' }, 'anonymous'),
          props.index != null
            ? h('span', { class: 'op50 text-sm' }, ` #${props.index + 1}`)
            : null,
        ])
      }
    }
  },
})

// @unocss-include
