export default function bossStateManager() {
    let instance = null;

    function createInstance() {
      const maxHealth = 10;
      let health = maxHealth;


      return {
        getMaxHealth: () => maxHealth,
        setHealth(value) {
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

export const bossState = bossStateManager().getInstance();