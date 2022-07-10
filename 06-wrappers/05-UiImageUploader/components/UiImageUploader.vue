<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': uploadPhase === 2 }"
      :style="previewImage"
      @click="removeUploadedFile"
    >
      <span class="image-uploader__text">{{ phaseMessage[uploadPhase] }}</span>
      <input
        ref="file"
        v-bind="$attrs"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        @change="selectFile"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',

  inheritAttrs: false,

  props: {
    preview: String,
    uploader: Function,
  },

  emits: ['remove', 'upload', 'select', 'error'],

  data() {
    return {
      uploadPhase: 1,
      phaseMessage: {
        1: 'Загрузить изображение',
        2: 'Загрузка...',
        3: 'Удалить изображение',
      },
    };
  },

  computed: {
    previewImage() {
      return this.preview ? `--bg-url: url('${this.preview}')` : null;
    },
  },

  created() {
    this.uploadPhase = this.preview ? 3 : 1;
  },

  methods: {
    selectFile() {
      if (this.$refs['file'].files.length) {
        let selectedFile = this.$refs['file'].files[0];

        this.$emit('select', selectedFile);

        if (this.uploader) {
          this.uploadPhase = 2;

          try {
            this.uploader(selectedFile)
              .then((value) => {
                this.$emit('upload', value);
                this.uploadPhase = 3;
              })
              .catch((error) => {
                this.$emit('error', error);
                this.uploadPhase = this.preview ? 3 : 1;
              });
          } catch (error) {
            this.uploadPhase = this.preview ? 3 : 1;
            this.$emit('error', error);
          }
        } else {
          this.$emit('upload', { image: URL.createObjectURL(selectedFile) });
          this.uploadPhase = 3;
        }

        this.flushSelectedFile();
      }
    },
    removeUploadedFile(e) {
      if (this.uploadPhase === 2) {
        e.preventDefault();
      } else if (this.uploadPhase === 3) {
        e.preventDefault();
        this.uploadPhase = 1;
        this.flushSelectedFile();
        this.$emit('remove');
      }
    },
    flushSelectedFile() {
      this.$refs['file'].value = '';
    },
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
