export default function musicStateManager() {
    let instance = null;

    function createInstance() {
      let title = null;
      let obj = null;

      return {
        setTitle(value) {
          title = value;
        },
        getTitle: () => title,
        play() {
            obj = play(this.getTitle(), {
                paused: true,
                volume: 0.8,
                loop: true
            });
        },
        stop() {
            obj.stop();
        },
        getPaused: () => obj.paused,
        setPaused(value) {
            if (obj) {
                obj.paused = value
            }
        },
        getObj: () => obj,
      };
    }



    return {
      getInstance() {
        if (!instance) {
          instance = createInstance();
        }

        return instance;
      },
    };
  }

export const musicState = musicStateManager().getInstance();
