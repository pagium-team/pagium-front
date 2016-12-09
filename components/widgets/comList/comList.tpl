<div id="comList">
    <div v-for="eCom in editComs">
        <div id="input-select" class="row cl-item">
            <div class="col s12 m8 l8">
                <div class="input-field col s12">
                    <template v-if="eCom.disabled == 'true'">
                        <select id="select{{$index}}" disabled>
                            <option disabled selected>{{eCom.name}}</option>
                            <option v-for="com in allComs" value="{{com.code}}">{{com.name}}</option>
                        </select>
                    </template>
                    <template v-if="eCom.disabled == 'false'">
                        <select id="select{{$index}}">
                            <option disabled selected>{{eCom.name}}</option>
                            <option v-for="com in allComs" value="{{com.code}}">{{com.name}}</option>
                        </select>
                    </template>
                </div>
            </div>
            <a class="btn-floating waves-effect waves-light cl-item-btn grey lighten-5" v-on:click="edit($index);"><i class="mdi-editor-border-color" style="color: black;"></i></a>
            <a class="btn-floating waves-effect waves-light cl-item-btn grey lighten-5" v-on:click="remove($index);"><i class="mdi-action-delete" style="color: black;"></i></a>
             <a class="btn-floating btn-large waves-effect waves-light cl-item-btn grey lighten-5">
                <input id="posInput{{$index}}" class="cl-position-input" value={{eCom.pos}}></input>
            </a>
        </div>
        <div id="editPannel-{{$index}}" class="cl-editPanel"></div>
        <div id="input-select-{{$index}}" class="row cl-editBtnPanel">
            <button v-if="currentComIndex == $index" class="btn waves-effect waves-light grey lighten-5 cl-saveBtn" type="button" name="action" v-on:click="save($index);"> 保存
                <i class="mdi-content-save right"></i>
            </button>
            <button v-if="currentComIndex == $index" class="btn waves-effect waves-light grey lighten-5 cl-cancleBtn" type="button" name="action" v-on:click="cancle();" style="margin-left: 10px;"> 放弃
                <i class="mdi-navigation-close right"></i>
            </button>
        </div>
    </div>
    <div id="input-select" class="row cl-addBtn-panel">
        <button class="btn waves-effect waves-light col l12 cl-addBtn pink" type="button" name="action" v-on:click="add();"><i class="mdi-content-add-circle-outline cl-addIcon white-text">添加组件</i></button>
    </div>
</div>
<div id="editor"></div>