export default function playerGlobalStateManager() {
    let instance = null;
  
    function createInstance() {
      let isSwordEquipped = true;
      const maxHealth = 6;
      let health = maxHealth;
      let hasKeyObj = false;

      return {
        setIsSwordEquipped(value) {
          isSwordEquipped = value;
        },
        setHasKey(value) {
          hasKeyObj = value;
        },
        getHasKey: () => hasKeyObj,
        getIsSwordEquipped: () => isSwordEquipped,
        getMaxHealth: () => maxHealth,
        setHealth(value) {
          if (value < this.getHealth()) {
            play("player_live_loss");
          }
          health = value;
        },
        getHealth: () => health,
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

export const playerState = playerGlobalStateManager().getInstance();