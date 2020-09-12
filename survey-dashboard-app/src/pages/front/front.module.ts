/**
 * Survey Surfer (https://www.ennapd.com/surveysurferadminpanel)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FrontPage } from './front';

@NgModule({
  declarations: [
    FrontPage,
  ],
  imports: [
    IonicPageModule.forChild(FrontPage),
  ],
})
export class FrontPageModule {}
