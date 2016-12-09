<div id="accordion-options" style="margin-top: 20px">
    <div class="row">
    <div class="col s4">
        <ul class="tabs tab-demo z-depth-1">
            <li class="tab col s3"><a class="white-text waves-effect waves-light pl-tab-btn active" v-on:click="changeMode('wap');"><i class="mdi-hardware-phone-android"></i> 移动端</a>
            </li>
            <li class="tab col s3"><a class="white-text waves-effect waves-light pl-tab-btn" v-on:click="changeMode('pc');"><i class="mdi-hardware-laptop-windows"></i> PC 端</a>
            </li>
            <li class="tab col s3 waves-effect waves-light pink tooltipped pl-add-btn" data-position="right" data-delay="50" data-tooltip="添加活动页" v-on:click="shoAddPageDialog();"><i class="mdi-action-note-add"></i> 添加活动 </li>
        </ul>
    </div>
    </div>
    <div class="row">
        <template v-if="mode == 'pc'">
            <div class="col s12 m8 l12">
                <ul class="collapsible popout collapsible-accordion" data-collapsible="accordion">
                    <li v-for="pItem in pages.pc">
                        <div class="collapsible-header active"><i class="mdi-av-web"></i>{{pItem.name}}</div>
                        <div class="collapsible-body pl-ofa">
                            <p>{{pItem.desc}}</p>
                            <button class="btn waves-effect waves-light right client-edit" type="button" name="action" v-on:click="enterPage('pc', pItem.id, pItem.name);">进入
                                <i class="mdi-hardware-keyboard-arrow-right right"></i>
                            </button>
                            <button class="btn waves-effect waves-light right client-edit" type="button" name="action" v-on:click="shoEditPageDialog(pItem.id);">编辑
                                <i class="mdi-editor-border-color right"></i>
                            </button>
                            <button class="btn waves-effect waves-light right client-edit" type="button" name="action" v-on:click="showCopyPageDialog(pItem.id);">复制
                                <i class="mdi-content-content-copy right"></i>
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </template>
        <template v-if="mode == 'wap'">
            <div class="col s12 m8 l12">
                <ul class="collapsible popout collapsible-accordion" data-collapsible="accordion">
                    <li v-for="pItem in pages.wap">
                        <div class="collapsible-header active"><i class="mdi-av-web"></i>{{pItem.name}}</div>
                        <div class="collapsible-body pl-ofa">
                            <p>{{pItem.desc}}</p>
                            <button class="btn waves-effect waves-light right client-edit" type="button" name="action" v-on:click="enterPage('wap', pItem.id, pItem.name);">进入
                                <i class="mdi-hardware-keyboard-arrow-right right"></i>
                            </button>
                            <button class="btn waves-effect waves-light right client-edit" type="button" name="action" v-on:click="shoEditPageDialog(pItem.id);">编辑
                                <i class="mdi-editor-border-color right"></i>
                            </button>
                            <button class="btn waves-effect waves-light right client-edit" type="button" name="action" v-on:click="showCopyPageDialog(pItem.id);">复制
                                <i class="mdi-content-content-copy right"></i>
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </template>
    </div>
</div>