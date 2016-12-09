<div id="addProjectBox" class="modal" style="top:35%;">
    <div class="modal-content">
        <form class="col s12 right-alert">
            <div class="row">
                <div class="input-field col s12">
                    <input id="projectName" type="text" v-model="projectName">
                    <label for="projectName">项目名称</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input id="projectDesc" type="text" v-model="projectDesc">
                    <label for="projectDesc">项目描述</label>
                </div>
            </div>
        </form>
    </div>
    <div class="modal-footer">
        <button class="btn waves-effect waves-light" style="margin-left: 10px;" type="button" name="action" v-on:click="confirm();">
        	确定<i class="mdi-content-save right"></i>
        </button>
        <button class="btn waves-effect waves-light" style="margin-left: 10px;" type="button" name="action" v-on:click="cancle();">
        	取消<i class="mdi-action-highlight-remove right"></i>
        </button>
    </div>
</div>