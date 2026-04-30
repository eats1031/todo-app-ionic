import { Injectable } from '@angular/core';
import { getRemoteConfig, fetchAndActivate, getValue } from 'firebase/remote-config';
import { firebaseApp } from '../firebase.config';

@Injectable({ providedIn: 'root' })
export class FeatureFlagService {
  private remoteConfig = getRemoteConfig(firebaseApp);
  private initialized = false;

  constructor() {
    this.remoteConfig.settings.minimumFetchIntervalMillis = 60000; // 1 min cache
    this.remoteConfig.defaultConfig = {
      show_statistics: false
    };
  }

  async init(): Promise<void> {
    if (this.initialized) return;
    try {
      await fetchAndActivate(this.remoteConfig);
      this.initialized = true;
      console.log('[FeatureFlag] Remote Config inicializado');
    } catch (error) {
      console.error('[FeatureFlag] Error al inicializar:', error);
    }
  }

  isEnabled(flagName: string): boolean {
    return getValue(this.remoteConfig, flagName).asBoolean();
  }
}