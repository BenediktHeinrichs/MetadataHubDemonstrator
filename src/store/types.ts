import type { RemovableRef } from "@vueuse/core";

export interface MainState {
  /*  
    --------------------------------------------------------------------------------------
    STATE TYPE DEFINITION
    --------------------------------------------------------------------------------------
  */
  metadatahub: {
    tokens: RemovableRef<Record<string, string>>;
  };
}
