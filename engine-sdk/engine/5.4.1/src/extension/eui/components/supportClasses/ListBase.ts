//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

namespace eui.sys {

    /**
     * @private
     */
    export const enum ListBaseKeys {
        /**
         * @private
         */
        requireSelection,
        /**
         * @private
         */
        requireSelectionChanged,
        /**
         * @private
         */
        proposedSelectedIndex,
        /**
         * @private
         */
        selectedIndex,
        /**
         * @private
         */
        dispatchChangeAfterSelection,
        /**
         * @private
         */
        pendingSelectedItem,
        /**
         * @private
         */
        selectedIndexAdjusted,
        /**
         * @private
         */
        touchDownItemRenderer,
        /**
         * @private
         */
        touchCancle
    }
}

namespace eui {

    /**
     * The ListBase class is the base class for list component.
     * It can display items of list as vertical or horizontal such as SELECT of HTML.
     * @event egret.Event.CHANGE Dispatched after the selection has changed.
     * This event is dispatched when the user interacts with the control.
     * @event egret.Event.CHANGING Dispatched when the selection is going to change.
     * Calling the <code>preventDefault()</code> method
     * on the event prevents the selection from changing.<p/>
     * This event is dispatched when the user interacts with the control.
     *
     * @event eui.ItemTapEvent.ITEM_TAP dispatched when the user tap an item in the control.
     * @event egret.TouchEvent.TOUCH_CANCEL canceled the touch
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @language en_US
     */
    /**
     * ListBase ?????????????????????????????????????????????????????????????????????????????? HTML ?????? SELECT ??????????????????????????????
     * @event egret.Event.CHANGE ?????????????????????????????????,?????????????????????????????????????????????????????????????????????????????????
     * @event egret.Event.CHANGING ????????????????????????????????????????????????????????????????????? preventDefault() ????????????????????????<p/>
     * ?????????????????????????????????????????????????????????????????????????????????
     *
     * @event eui.ItemTapEvent.ITEM_TAP ???????????????????????????
     * @event egret.TouchEvent.TOUCH_CANCEL ??????????????????
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @language zh_CN
     */
    export class ListBase extends DataGroup {

        /**
         * Constructor.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * ????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        public constructor() {
            super();
            this.$ListBase = {
                0: false,       //requireSelection
                1: false,       //requireSelectionChanged
                2: -2,          //proposedSelectedIndex
                3: -1,          //selectedIndex
                4: false,       //dispatchChangeAfterSelection
                5: undefined,   //pendingSelectedItem
                6: false,       //selectedIndexAdjusted
                7: null,        //touchDownItemRenderer
                8: false        //touchCancle
            };
        }

        /**
         * @private
         */
        $ListBase:Object;
        /**
         * Static constant representing the value "no selection".
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * ?????????????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        public static NO_SELECTION:number = -1;

        /**
         * Static constant representing no proposed selection.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * ??????????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        public static NO_PROPOSED_SELECTION:number = -2;

        /**
         * If <code>true</code>, a data item must always be selected in the control.
         * If the value is <code>true</code>, the <code>selectedIndex</code> property
         * is always set to a value between 0 and (<code>dataProvider.length</code> - 1).
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * ????????? true???????????????????????????????????????????????????
         * ??????????????? true??????????????? selectedIndex ??????????????? 0 ??? (dataProvider.length - 1) ?????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        public get requireSelection():boolean {
            return this.$ListBase[sys.ListBaseKeys.requireSelection];
        }

        public set requireSelection(value:boolean) {
            value = !!value;
            let values = this.$ListBase;
            if (value === values[sys.ListBaseKeys.requireSelection]) {
                return;
            }
            values[sys.ListBaseKeys.requireSelection] = value;
            if (value) {
                values[sys.ListBaseKeys.requireSelectionChanged] = true;
                this.invalidateProperties();
            }
        }

        /**
         * he 0-based index of the selected item, or -1 if no item is selected.
         * Setting the <code>selectedIndex</code> property deselects the currently selected
         * item and selects the data item at the specified index.<p/>
         *
         * The value is always between -1 and (<code>dataProvider.length</code> - 1).
         * If items at a lower index than <code>selectedIndex</code> are
         * removed from the component, the selected index is adjusted downward
         * accordingly. <p/>
         *
         * If the selected item is removed, the selected index is set to:<p/>
         *
         * <ul>
         *   <li>-1 if <code>requireSelection == false</code> or there are no remaining items.</li>
         *   <li>0 if <code>requireSelection == true</code> and there is at least one item.</li>
         * </ul><p/>
         *
         * When the user changes the <code>selectedIndex</code> property by interacting with the control,
         * the control dispatches the <code>change</code> and <code>changing</code> events.
         * When you change the value of the <code>selectedIndex</code> property programmatically,
         * it does not dispatches the <code>change</code> and <code>changing</code> events.</p>
         *
         * @default -1
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * ????????????????????? 0 ????????????
         * ????????????????????????????????????-1????????? selectedIndex ???????????????????????????????????????????????????????????????????????????????????????<p/>
         *
         * ?????????????????????-1???<code>(dataProvider.length - 1)</code>????????????????????????????????????????????????
         * <code>selectedIndex</code>????????????<code>selectedIndex</code>???????????????????????????????????????<p/>
         *
         * ????????????????????????????????????????????????????????????<p/>
         *
         * <ul>
         *    <li>-1: ?????? <code>requireSelection == false</code> ?????????????????????????????????</li>
         *    <li> 0: ?????? <code>requireSelection == true</code> ?????????????????????????????????????????????</li>
         * </ul><p/>
         * ??????????????????????????????????????? selectedIndex ?????????????????????????????? change ??? changing ?????????
         * ???????????????????????? selectedIndex ???????????????????????????????????? change ??? changing ?????????
         *
         * @default -1
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        public get selectedIndex():number {
            return this.$getSelectedIndex();
        }

        /**
         * @private
         *
         * @returns
         */
        $getSelectedIndex():number {
            let values = this.$ListBase;
            if (values[sys.ListBaseKeys.proposedSelectedIndex] != ListBase.NO_PROPOSED_SELECTION)
                return values[sys.ListBaseKeys.proposedSelectedIndex];
            return values[sys.ListBaseKeys.selectedIndex];
        }

        public set selectedIndex(value:number) {
            value = +value | 0;
            this.setSelectedIndex(value, false);
        }

        /**
         * Used internally to specify whether the selectedIndex changed programmatically or due to
         * user interaction.
         * @param value the new index need to select.
         * @param dispatchChangeEvent if true, the component will dispatch a "change" event if the
         * value has changed.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * ???????????????????????????????????????
         * @param value ????????????
         * @param dispatchChangeEvent ??????????????????????????????????????????true????????????????????????????????????change????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        protected setSelectedIndex(value:number, dispatchChangeEvent?:boolean):void {
            if (value == this.selectedIndex) {
                return;
            }
            let values = this.$ListBase;
            if (dispatchChangeEvent)
                values[sys.ListBaseKeys.dispatchChangeAfterSelection] =
                    (values[sys.ListBaseKeys.dispatchChangeAfterSelection] || dispatchChangeEvent);
            values[sys.ListBaseKeys.proposedSelectedIndex] = value;
            this.invalidateProperties();
        }


        /**
         * The item that is currently selected.
         * Setting this property deselects the currently selected
         * item and selects the newly specified item.<p/>
         *
         * Setting <code>selectedItem</code> to an item that is not
         * in this component results in no selection,
         * and <code>selectedItem</code> being set to <code>undefined</code>.<p/>
         *
         * If the selected item is removed, the selected item is set to:<p/>
         * <ul>
         *   <li><code>undefined</code> if <code>requireSelection == false</code>
         *     or there are no remaining items.</li>
         *   <li>The first item if <code>requireSelection</code> = <code>true</code>
         *     and there is at least one item.</li>
         * </ul><p/>
         *
         * When the user changes the <code>selectedItem</code> property by interacting with the control,
         * the control dispatches the <code>change</code> and <code>changing</code> events.
         * When you change the value of the <code>selectedIndex</code> property programmatically,
         * it does not dispatches the <code>change</code> and <code>changing</code> events.</p>
         *
         * @default undefined
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * ????????????????????????????????????????????????????????????????????????????????????????????????????????????<p/>
         *
         * ???????????????<code>selectedItem</code>???????????????????????????<code>selectedItem</code>????????????
         * ???<code>undefined</code>???<p/>
         *
         * ????????????????????????????????????????????????????????????<p/>
         * <ul>
         *   <li><code>undefined</code>: ?????? <code>requireSelection == false</code>
         *     ??????????????????????????????</li>
         *   <li>?????????: ??? <code>requireSelection == true</code>
         *     ????????????????????????????????????.</li>
         * </ul><p/>
         *
         * ??????????????????????????????????????? selectedItem ?????????????????????????????? change ??? changing ?????????
         * ???????????????????????? selectedItem ???????????????????????????????????? change ??? changing ?????????<p/>
         *
         * @default undefined
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        public get selectedItem():any {
            let values = this.$ListBase;
            if (values[sys.ListBaseKeys.pendingSelectedItem] !== undefined)
                return values[sys.ListBaseKeys.pendingSelectedItem];

            let selectedIndex = this.$getSelectedIndex();
            if (selectedIndex == ListBase.NO_SELECTION || this.$dataProvider == null)
                return undefined;

            return this.$dataProvider.length > selectedIndex ? this.$dataProvider.getItemAt(selectedIndex) : undefined;
        }

        public set selectedItem(value:any) {
            this.setSelectedItem(value, false);
        }

        /**
         * Used internally to specify whether the selectedItem changed programmatically or due to
         * user interaction.
         * @param value the new item need to select.
         * @param dispatchChangeEvent if true, the component will dispatch a "change" event if the
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * ?????????????????????????????????????????????
         * @param value ??????????????????
         * @param dispatchChangeEvent ??????????????????????????????????????????true????????????????????????????????????change????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        protected setSelectedItem(value:any, dispatchChangeEvent:boolean = false):void {
            if (this.selectedItem === value)
                return;

            let values = this.$ListBase;
            if (dispatchChangeEvent)
                values[sys.ListBaseKeys.dispatchChangeAfterSelection] =
                    (values[sys.ListBaseKeys.dispatchChangeAfterSelection] || dispatchChangeEvent);

            values[sys.ListBaseKeys.pendingSelectedItem] = value;
            this.invalidateProperties();
        }

        /**
         * Processes the properties set on the component.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * ??????????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        protected commitProperties():void {
            let dataProviderChanged = this.$dataProviderChanged;
            super.commitProperties();

            let values = this.$ListBase;
            let selectedIndex = this.$getSelectedIndex();
            let dataProvider = this.$dataProvider;
            if (dataProviderChanged) {
                if (selectedIndex >= 0 && dataProvider && selectedIndex < dataProvider.length)
                    this.itemSelected(selectedIndex, true);
                else if (this.requireSelection)
                    values[sys.ListBaseKeys.proposedSelectedIndex] = 0;
                else
                    this.setSelectedIndex(-1, false);
            }

            if (values[sys.ListBaseKeys.requireSelectionChanged]) {
                values[sys.ListBaseKeys.requireSelectionChanged] = false;

                if (values[sys.ListBaseKeys.requireSelection] &&
                    selectedIndex == ListBase.NO_SELECTION &&
                    dataProvider &&
                    dataProvider.length > 0) {
                    values[sys.ListBaseKeys.proposedSelectedIndex] = 0;
                }
            }

            if (values[sys.ListBaseKeys.pendingSelectedItem] !== undefined) {
                if (dataProvider)
                    values[sys.ListBaseKeys.proposedSelectedIndex] =
                        dataProvider.getItemIndex(values[sys.ListBaseKeys.pendingSelectedItem]);
                else
                    values[sys.ListBaseKeys.proposedSelectedIndex] = ListBase.NO_SELECTION;

                values[sys.ListBaseKeys.pendingSelectedItem] = undefined;
            }

            let changedSelection = false;
            if (values[sys.ListBaseKeys.proposedSelectedIndex] != ListBase.NO_PROPOSED_SELECTION)
                changedSelection = this.commitSelection();

            if (values[sys.ListBaseKeys.selectedIndexAdjusted]) {
                values[sys.ListBaseKeys.selectedIndexAdjusted] = false;
                if (!changedSelection) {
                    PropertyEvent.dispatchPropertyEvent(this, PropertyEvent.PROPERTY_CHANGE, "selectedIndex");
                }
            }
        }

        /**
         * Updates an item renderer for use or reuse.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * ??????????????????????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        public updateRenderer(renderer:IItemRenderer, itemIndex:number, data:any):IItemRenderer {
            this.itemSelected(itemIndex, this.$isItemIndexSelected(itemIndex));
            return super.updateRenderer(renderer, itemIndex, data);
        }

        /**
         * Called when an item is selected or deselected.
         * Subclasses must override this method to display the selection.
         * @param index The item index that was selected.
         * @param selected <code>true</code> if the item is selected,
         * and <code>false</code> if it is deselected.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * ??????????????????????????????????????????????????????????????????????????????????????????
         * @param index ???????????????????????????
         * @param selected <code>true</code>????????????<code>false</code>????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        protected itemSelected(index:number, selected:boolean):void {
            let renderer = this.$indexToRenderer[index];
            if (renderer) {
                renderer.selected = selected;
            }
        }

        /**
         * @private
         * ????????????????????????????????????????????????
         */
        $isItemIndexSelected(index:number):boolean {
            return index == this.selectedIndex;
        }

        /**
         * The selection validation and commitment workhorse method.
         * Called to commit the pending selected index. This method dispatches
         * the "changing" event, and if the event is not cancelled,
         * commits the selection change and then dispatches the "change"
         * event.
         * @param dispatchChangedEvents if dispatch a "changed" event.
         * @return true if the selection was committed, or false if the selection
         * was cancelled.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * ???????????????????????????????????????????????????changing?????????????????????????????????????????????
         * ??????????????????????????????????????????????????????change????????????
         * @param dispatchChangedEvents ?????????????????????changed????????????
         * @return true ??????????????????, false???????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        protected commitSelection(dispatchChangedEvents:boolean = true):boolean {
            let dataProvider = this.$dataProvider;
            let values = this.$ListBase;
            let maxIndex = dataProvider ? dataProvider.length - 1 : -1;
            let oldSelectedIndex = values[sys.ListBaseKeys.selectedIndex];
            let tmpProposedIndex = values[sys.ListBaseKeys.proposedSelectedIndex];
            if (tmpProposedIndex < ListBase.NO_SELECTION)
                tmpProposedIndex = ListBase.NO_SELECTION;
            if (tmpProposedIndex > maxIndex)
                tmpProposedIndex = maxIndex;
            if (values[sys.ListBaseKeys.requireSelection] && tmpProposedIndex == ListBase.NO_SELECTION &&
                dataProvider && dataProvider.length > 0) {
                values[sys.ListBaseKeys.proposedSelectedIndex] = ListBase.NO_PROPOSED_SELECTION;
                values[sys.ListBaseKeys.dispatchChangeAfterSelection] = false;
                return false;
            }


            if (values[sys.ListBaseKeys.dispatchChangeAfterSelection]) {
                let result = this.dispatchEventWith(egret.Event.CHANGING, false, true, true);
                if (!result) {
                    this.itemSelected(values[sys.ListBaseKeys.proposedSelectedIndex], false);
                    values[sys.ListBaseKeys.proposedSelectedIndex] = ListBase.NO_PROPOSED_SELECTION;
                    values[sys.ListBaseKeys.dispatchChangeAfterSelection] = false;
                    return false;
                }

            }

            values[sys.ListBaseKeys.selectedIndex] = tmpProposedIndex;
            values[sys.ListBaseKeys.proposedSelectedIndex] = ListBase.NO_PROPOSED_SELECTION;

            if (oldSelectedIndex != ListBase.NO_SELECTION)
                this.itemSelected(oldSelectedIndex, false);
            if (values[sys.ListBaseKeys.selectedIndex] != ListBase.NO_SELECTION)
                this.itemSelected(values[sys.ListBaseKeys.selectedIndex], true);

            //???????????????????????????Change????????????????????????????????????????????????dispatchChangedEvents???false
            if (dispatchChangedEvents) {
                if (values[sys.ListBaseKeys.dispatchChangeAfterSelection]) {
                    this.dispatchEventWith(egret.Event.CHANGE);
                    values[sys.ListBaseKeys.dispatchChangeAfterSelection] = false;
                }
                PropertyEvent.dispatchPropertyEvent(this, PropertyEvent.PROPERTY_CHANGE, "selectedIndex");
                PropertyEvent.dispatchPropertyEvent(this, PropertyEvent.PROPERTY_CHANGE, "selectedItem");
            }

            return true;
        }

        /**
         * Adjusts the selected index to account for items being added to or
         * removed from this component.
         * It does not dispatch a <code>change</code> event because the change did not
         * occur as a direct result of user-interaction.  Moreover,
         * it does not dispatch a <code>changing</code> event
         * or allow the cancellation of the selection.
         * It also does not call the <code>itemSelected()</code> method,
         * since the same item is selected;
         * @param newIndex The new index.
         * @param add <code>true</code> if an item was added to the component,
         *  and <code>false</code> if an item was removed.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * ?????????????????????????????????????????????,????????????????????????itemSelected???????????????????????????????????????changing???change?????????
         * @param newIndex ????????????
         * @param add ??????????????????????????????????????????<code>true</code>?????????????????????????????????<code>false</code>???
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        protected adjustSelection(newIndex:number, add:boolean = false):void {
            let values = this.$ListBase;
            if (values[sys.ListBaseKeys.proposedSelectedIndex] != ListBase.NO_PROPOSED_SELECTION)
                values[sys.ListBaseKeys.proposedSelectedIndex] = newIndex;
            else
                values[sys.ListBaseKeys.selectedIndex] = newIndex;
            values[sys.ListBaseKeys.selectedIndexAdjusted] = true;
            this.invalidateProperties();
        }

        /**
         * Called when an item has been added to this component. Selection
         * and caret related properties are adjusted accordingly.
         * @param item The item being added.
         * @param index The index of the item being added.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * ???????????????
         * @param item ??????????????????
         * @param index ???????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        protected itemAdded(item:any, index:number):void {
            super.itemAdded(item, index);
            let selectedIndex = this.$getSelectedIndex();
            if (selectedIndex == ListBase.NO_SELECTION) {
                if (this.$ListBase[sys.ListBaseKeys.requireSelection])
                    this.adjustSelection(index, true);
            }
            else if (index <= selectedIndex) {
                this.adjustSelection(selectedIndex + 1, true);
            }
        }

        /**
         * Called when an item has been removed from this component.
         * Selection and caret related properties are adjusted
         * accordingly.
         * @param item The item being removed.
         * @param index The index of the item being removed.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * ???????????????
         * @param item ??????????????????
         * @param index ???????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        protected itemRemoved(item:any, index:number):void {
            super.itemRemoved(item, index);
            if (this.selectedIndex == ListBase.NO_SELECTION)
                return;

            let selectedIndex = this.$getSelectedIndex();
            if (index == selectedIndex) {
                if (this.requireSelection && this.$dataProvider && this.$dataProvider.length > 0) {
                    if (index == 0) {
                        this.$ListBase[sys.ListBaseKeys.proposedSelectedIndex] = 0;
                        this.invalidateProperties();
                    }
                    else
                        this.setSelectedIndex(0, false);
                }
                else
                    this.adjustSelection(-1, false);
            }
            else if (index < selectedIndex) {
                this.adjustSelection(selectedIndex - 1, false);
            }
        }


        /**
         * Event Listener of source data changed.
         * @param The <code>egret.gui.CollectionEvent</code> object.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * ??????????????????????????????
         * @param event ?????? <code>egret.gui.CollectionEvent</code> ????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        protected onCollectionChange(event:CollectionEvent):void {
            super.onCollectionChange(event);
            if (event.kind == CollectionEventKind.RESET) {
                if (this.$dataProvider.length == 0) {
                    this.setSelectedIndex(ListBase.NO_SELECTION, false);
                }
            }
            else if (event.kind == CollectionEventKind.REFRESH) {
                this.dataProviderRefreshed();
            }
        }

        /**
         * Default response to dataProvider refresh events: clear the selection and caret.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        protected dataProviderRefreshed():void {
            this.setSelectedIndex(ListBase.NO_SELECTION, false);
        }

        /**
         * Called when an item has been added to this component.
         * @param renderer the renderer being added.
         * @param index the index of renderer
         * @param item the data of renderer
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * ?????????????????????
         * @param renderer ?????????????????????
         * @param index ?????????????????????
         * @param item ???????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        protected rendererAdded(renderer:IItemRenderer, index:number, item:any):void {
            renderer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onRendererTouchBegin, this);
            renderer.addEventListener(egret.TouchEvent.TOUCH_END, this.onRendererTouchEnd, this);
            renderer.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onRendererTouchCancle, this);
        }

        /**
         * Called when an item has been removed to this component.
         * @param renderer the renderer being removed.
         * @param index the index of renderer.
         * @param item the data of renderer.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * ?????????????????????
         * @param renderer ?????????????????????
         * @param index ?????????????????????
         * @param item ???????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        protected rendererRemoved(renderer:IItemRenderer, index:number, item:any):void {
            renderer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onRendererTouchBegin, this);
            renderer.removeEventListener(egret.TouchEvent.TOUCH_END, this.onRendererTouchEnd, this);
            renderer.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onRendererTouchCancle, this);
        }

        /**
         * Handles <code>egret.TouchEvent.TOUCH_BEGIN</code> events from any of the
         * item renderers. This method handles <code>egret.TouchEvent.TOUCH_END</code>.
         * @param event The <code>egret.TouchEvent</code> object.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * ??????????????????<code>egret.TouchEvent.TOUCH_BEGIN</code>??????????????????????????????????????????<code>egret.TouchEvent.TOUCH_END</code>
         * ??????????????????
         * @param event ??????<code>egret.TouchEvent</code>????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        protected onRendererTouchBegin(event:egret.TouchEvent):void {
            if(!this.$stage) {
                return;
            }
            let values = this.$ListBase;
            if (event.$isDefaultPrevented)
                return;
            values[sys.ListBaseKeys.touchCancle] = false;
            values[sys.ListBaseKeys.touchDownItemRenderer] = <IItemRenderer> (event.$currentTarget);
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_END, this.stage_touchEndHandler, this);
        }
        /**
         * Handles <code>egret.TouchEvent.TOUCH_CANCEL</code> events from any of the
         * item renderers. This method will cancel the handles <code>egret.TouchEvent.TOUCH_END</code> and <code>egret.TouchEvent.TOUCH_TAP</code>.
         * @param event The <code>egret.TouchEvent</code> object.
         * @version Egret 3.0.1
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * ??????????????????<code>egret.TouchEvent.TOUCH_CANCEL</code>?????????????????????????????????????????????<code>egret.TouchEvent.TOUCH_END</code>
         * ???<code>egret.TouchEvent.TOUCH_TAP</code>??????????????????
         * @param event ??????<code>egret.TouchEvent</code>????????????
         * @version Egret 3.0.1
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        protected onRendererTouchCancle(event:egret.TouchEvent):void {
            let values = this.$ListBase;
            values[sys.ListBaseKeys.touchDownItemRenderer] = null;
            values[sys.ListBaseKeys.touchCancle] = true;
            if(this.$stage){
                this.$stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.stage_touchEndHandler, this);
            }
        }
        /**
         * Handles <code>egret.TouchEvent.TOUCH_END</code> events and dispatch <code>ItemTapEvent.ITEM_TAP</code> event.
         * @param event The <code>egret.TouchEvent</code> object.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * ???????????????????????????????????????<code>ItemTapEvent.ITEM_TAP</code>?????????
         * @param event ??????<code>egret.TouchEvent</code>????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        protected onRendererTouchEnd(event:egret.TouchEvent):void {
            let values = this.$ListBase;
            let itemRenderer = <IItemRenderer> (event.$currentTarget);
            let touchDownItemRenderer = values[sys.ListBaseKeys.touchDownItemRenderer];
            if (itemRenderer != touchDownItemRenderer)
                return;
            if(!values[sys.ListBaseKeys.touchCancle]){
                this.setSelectedIndex(itemRenderer.itemIndex, true);
                ItemTapEvent.dispatchItemTapEvent(this, ItemTapEvent.ITEM_TAP, itemRenderer);
            }
            values[sys.ListBaseKeys.touchCancle] = false;
        }

        /**
         * @private
         * ????????????????????????
         */
        private stage_touchEndHandler(event:egret.Event):void {
            let stage = <egret.Stage>event.$currentTarget;
            stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.stage_touchEndHandler, this);
            this.$ListBase[sys.ListBaseKeys.touchDownItemRenderer] = null;
        }
    }

    registerBindable(ListBase.prototype, "selectedIndex");

    registerBindable(ListBase.prototype, "selectedItem");
}
