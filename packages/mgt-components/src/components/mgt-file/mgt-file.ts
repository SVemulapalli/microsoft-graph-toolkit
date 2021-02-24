/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */

import { Drive, DriveItem, Image } from '@microsoft/microsoft-graph-types';
import { customElement, html, property, TemplateResult } from 'lit-element';
import { styles } from './mgt-file-css';
import { MgtTemplatedComponent, Providers, ProviderState } from '@microsoft/mgt-element';
import {
  getDriveItemById,
  getDriveItemByPath,
  getDriveItemByQuery,
  getGroupDriveItemById,
  getGroupDriveItemByPath,
  getListDriveItemById,
  getMyDriveItemById,
  getMyDriveItemByPath,
  getMyInsightsDriveItemById,
  getSiteDriveItemById,
  getSiteDriveItemByPath,
  getUserDriveItemById,
  getUserDriveItemByPath,
  getUserInsightsDriveItemById
} from '../../graph/graph.files';
import { getRelativeDisplayDate } from '../../utils/Utils';
import { OfficeGraphInsightString, ViewType } from '../../graph/types';
import { getFileTypeIconUri, getFileTypeIconUriByExtension } from '../../styles/fluent-icons';

/**
 * The File component is used to represent an individual file/folder from OneDrive or SharePoint by displaying information such as the file/folder name, an icon indicating the file type, and other properties such as the author, last modified date, or other details selected by the developer.
 *
 * @export
 * @class MgtFile
 * @extends {MgtTemplatedComponent}
 */
@customElement('mgt-file')
export class MgtFile extends MgtTemplatedComponent {
  /**
   * Array of styles to apply to the element. The styles should be defined
   * using the `css` tag function.
   */
  static get styles() {
    return styles;
  }

  /**
   * allows developer to provide query for a file
   *
   * @type {string}
   * @memberof MgtFile
   */
  @property({
    attribute: 'file-query'
  })
  public get fileQuery(): string {
    return this._fileQuery;
  }
  public set fileQuery(value: string) {
    if (value === this._fileQuery) {
      return;
    }

    this._fileQuery = value;
    this.requestStateUpdate();
  }

  /**
   * allows developer to provide site id for a file
   *
   * @type {string}
   * @memberof MgtFile
   */
  @property({
    attribute: 'site-id'
  })
  public get siteId(): string {
    return this._siteId;
  }
  public set siteId(value: string) {
    if (value === this._siteId) {
      return;
    }

    this._siteId = value;
    this.requestStateUpdate();
  }

  /**
   * allows developer to provide drive id for a file
   *
   * @type {string}
   * @memberof MgtFile
   */
  @property({
    attribute: 'drive-id'
  })
  public get driveId(): string {
    return this._driveId;
  }
  public set driveId(value: string) {
    if (value === this._driveId) {
      return;
    }

    this._driveId = value;
    this.requestStateUpdate();
  }

  /**
   * allows developer to provide group id for a file
   *
   * @type {string}
   * @memberof MgtFile
   */
  @property({
    attribute: 'group-id'
  })
  public get groupId(): string {
    return this._groupId;
  }
  public set groupId(value: string) {
    if (value === this._groupId) {
      return;
    }

    this._groupId = value;
    this.requestStateUpdate();
  }

  /**
   * allows developer to provide list id for a file
   *
   * @type {string}
   * @memberof MgtFile
   */
  @property({
    attribute: 'list-id'
  })
  public get listId(): string {
    return this._listId;
  }
  public set listId(value: string) {
    if (value === this._listId) {
      return;
    }

    this._listId = value;
    this.requestStateUpdate();
  }

  /**
   * allows developer to provide user id for a file
   *
   * @type {string}
   * @memberof MgtFile
   */
  @property({
    attribute: 'user-id'
  })
  public get userId(): string {
    return this._userId;
  }
  public set userId(value: string) {
    if (value === this._userId) {
      return;
    }

    this._userId = value;
    this.requestStateUpdate();
  }

  /**
   * allows developer to provide item id for a file
   *
   * @type {string}
   * @memberof MgtFile
   */
  @property({
    attribute: 'item-id'
  })
  public get itemId(): string {
    return this._itemId;
  }
  public set itemId(value: string) {
    if (value === this._itemId) {
      return;
    }

    this._itemId = value;
    this.requestStateUpdate();
  }

  /**
   * allows developer to provide item path for a file
   *
   * @type {string}
   * @memberof MgtFile
   */
  @property({
    attribute: 'item-path'
  })
  public get itemPath(): string {
    return this._itemPath;
  }
  public set itemPath(value: string) {
    if (value === this._itemPath) {
      return;
    }

    this._itemPath = value;
    this.requestStateUpdate();
  }

  /**
   * allows developer to provide insight type for a file
   * can be trending, used, or shared
   *
   * @type {OfficeGraphInsightString}
   * @memberof MgtFile
   */
  @property({
    attribute: 'insight-type'
  })
  public get insightType(): OfficeGraphInsightString {
    return this._insightType;
  }
  public set insightType(value: OfficeGraphInsightString) {
    if (value === this._insightType) {
      return;
    }

    this._insightType = value;
    this.requestStateUpdate();
  }

  /**
   * allows developer to provide insight id for a file
   *
   * @type {string}
   * @memberof MgtFile
   */
  @property({
    attribute: 'insight-id'
  })
  public get insightId(): string {
    return this._insightId;
  }
  public set insightId(value: string) {
    if (value === this._insightId) {
      return;
    }

    this._insightId = value;
    this.requestStateUpdate();
  }

  /**
   * allows developer to provide file object
   *
   * @type {DriveItem}
   * @memberof MgtFile
   */
  @property({
    attribute: 'file-details'
  })
  public get fileDetails(): DriveItem {
    return this._fileDetails;
  }
  public set fileDetails(value: DriveItem) {
    if (value === this._fileDetails) {
      return;
    }

    this._fileDetails = value;
    this.requestStateUpdate();
  }

  /**
   * allows developer to provide file type icon url
   *
   * @type {string}
   * @memberof MgtFile
   */
  @property({
    attribute: 'file-icon'
  })
  public get fileIcon(): string {
    return this._fileIcon;
  }
  public set fileIcon(value: string) {
    if (value === this._fileIcon) {
      return;
    }

    this._fileIcon = value;
    this.requestStateUpdate();
  }

  /**
   * object containing Graph details on driveItem
   *
   * @type {string}
   * @memberof MgtFile
   */
  @property({
    attribute: 'drive-item',
    type: Object
  })
  public driveItem: DriveItem;

  /**
   * Sets the property of the file to use for the first line of text.
   * Default is file name
   *
   * @type {string}
   * @memberof MgtFile
   */
  @property({ attribute: 'line1-property' }) public line1Property: string;

  /**
   * Sets the property of the file to use for the second line of text.
   * Default is last modified date time
   *
   * @type {string}
   * @memberof MgtFile
   */
  @property({ attribute: 'line2-property' }) public line2Property: string;

  /**
   * Sets the property of the file to use for the second line of text.
   * Default is file size
   *
   * @type {string}
   * @memberof MgtFile
   */
  @property({ attribute: 'line3-property' }) public line3Property: string;

  /**
   * Sets what data to be rendered (file icon only, oneLine, twoLines threeLines).
   * Default is 'threeLines'.
   *
   * @type {ViewType}
   * @memberof MgtFile
   */
  @property({
    converter: value => {
      if (!value || value.length === 0) {
        return ViewType.threelines;
      }

      value = value.toLowerCase();

      if (typeof ViewType[value] === 'undefined') {
        return ViewType.threelines;
      } else {
        return ViewType[value];
      }
    }
  })
  public view: ViewType;

  private _fileQuery: string;
  private _siteId: string;
  private _itemId: string;
  private _driveId: string;
  private _itemPath: string;
  private _listId: string;
  private _groupId: string;
  private _userId: string;
  private _insightType: OfficeGraphInsightString;
  private _insightId: string;
  private _fileDetails: DriveItem;
  private _fileIcon: string;

  constructor() {
    super();
    this.line1Property = 'name';
    this.line2Property = 'lastModifiedDateTime';
    this.line3Property = 'size';
    this.view = ViewType.threelines;
  }

  public render() {
    if (!this.driveItem && this.isLoadingState) {
      return this.renderLoading();
    }

    if (!this.driveItem) {
      return this.renderNoData();
    }

    const file = this.driveItem;
    let fileTemplate;

    fileTemplate = this.renderTemplate('default', { file });
    if (!fileTemplate) {
      const fileDetailsTemplate: TemplateResult = this.renderDetails(file);
      const fileTypeIconTemplate: TemplateResult = this.renderFileTypeIcon();

      fileTemplate = html`
        <div class="item">
          ${fileTypeIconTemplate} ${fileDetailsTemplate}
        </div>
      `;
    }

    return html`
      ${fileTemplate}
    `;
  }

  /**
   * Render the loading state
   *
   * @protected
   * @returns {TemplateResult}
   * @memberof MgtFile
   */
  protected renderLoading(): TemplateResult {
    return this.renderTemplate('loading', null) || html``;
  }

  /**
   * Render the state when no data is available
   *
   * @protected
   * @returns {TemplateResult}
   * @memberof MgtFile
   */
  protected renderNoData(): TemplateResult {
    return this.renderTemplate('no-data', null) || html``;
  }

  /**
   * Render the file type icon
   *
   * @protected
   * @param {string} [iconSrc]
   * @memberof MgtFile
   */
  protected renderFileTypeIcon(): TemplateResult {
    if (!this.fileIcon && !this.driveItem.name) {
      return html``;
    }

    let fileIconSrc;

    if (this.fileIcon) {
      fileIconSrc = this.fileIcon;
    } else {
      // get file type extension from file name
      const re = /(?:\.([^.]+))?$/;
      const fileType = re.exec(this.driveItem.name)[1] || 'folder';
      fileIconSrc = getFileTypeIconUriByExtension(fileType, 48, 'svg');
    }

    return html`
      <div class="item__file-type-icon">
        <img src=${fileIconSrc} />
      </div>
    `;
  }

  /**
   * Render the file details
   *
   * @protected
   * @param {MicrosoftGraph.DriveItem} [driveItem]
   * @memberof MgtFile
   */
  protected renderDetails(driveItem: DriveItem): TemplateResult {
    if (!driveItem || this.view === ViewType.image) {
      return html``;
    }

    const details: TemplateResult[] = [];

    if (this.view > ViewType.image) {
      const text = this.getTextFromProperty(driveItem, this.line1Property);
      if (text) {
        details.push(html`
          <div class="line1" aria-label="${text}">${text}</div>
        `);
      }
    }

    if (this.view > ViewType.oneline) {
      const text = this.getTextFromProperty(driveItem, this.line2Property);
      if (text) {
        details.push(html`
          <div class="line2" aria-label="${text}">${text}</div>
        `);
      }
    }

    if (this.view > ViewType.twolines) {
      const text = this.getTextFromProperty(driveItem, this.line3Property);
      if (text) {
        details.push(html`
          <div class="line3" aria-label="${text}">${text}</div>
        `);
      }
    }

    return html`
      <div class="item__details">
        ${details}
      </div>
    `;
  }

  /**
   * load state into the component.
   *
   * @protected
   * @returns
   * @memberof MgtFile
   */
  protected async loadState() {
    const provider = Providers.globalProvider;
    if (!provider || provider.state === ProviderState.Loading) {
      return;
    }

    if (provider.state === ProviderState.SignedOut) {
      this.driveItem = null;
      return;
    }

    const graph = provider.graph.forComponent(this);
    let driveItem;

    // return null when a combination of provided properties are required
    if (
      (this.driveId && (!this.itemId && !this.itemPath)) ||
      (this.siteId && (!this.itemId && !this.itemPath)) ||
      (this.groupId && (!this.itemId && !this.itemPath)) ||
      (this.listId && (!this.siteId && !this.itemId)) ||
      (this.insightType && !this.insightId) ||
      (this.userId && (!this.insightType && !this.insightId)) ||
      (this.userId && (!this.itemId && !this.itemPath))
    ) {
      driveItem = null;
    }

    if (this.fileDetails) {
      driveItem = this.fileDetails;
    }

    // evaluate to true when only item-id or item-path is provided
    const getFromMyDrive = !this.driveId && !this.siteId && !this.groupId && !this.listId && !this.userId;

    // todo: error handle can't find file

    if (this.fileQuery) {
      driveItem = await getDriveItemByQuery(graph, this.fileQuery);
    } else if (this.itemId && getFromMyDrive) {
      driveItem = await getMyDriveItemById(graph, this.itemId);
    } else if (this.itemPath && getFromMyDrive) {
      driveItem = await getMyDriveItemByPath(graph, this.itemPath);
    } else if (this.userId) {
      if (this.itemId) {
        driveItem = await getUserDriveItemById(graph, this.userId, this.itemId);
      } else if (this.itemPath) {
        driveItem = await getUserDriveItemByPath(graph, this.userId, this.itemPath);
      }
    } else if (this.driveId) {
      if (this.itemId) {
        driveItem = await getDriveItemById(graph, this.driveId, this.itemId);
      } else if (this.itemPath) {
        driveItem = await getDriveItemByPath(graph, this.driveId, this.itemPath);
      }
    } else if (this.siteId && !this.listId) {
      if (this.itemId) {
        driveItem = await getSiteDriveItemById(graph, this.siteId, this.itemId);
      } else if (this.itemPath) {
        driveItem = await getSiteDriveItemByPath(graph, this.siteId, this.itemPath);
      }
    } else if (this.listId) {
      driveItem = await getListDriveItemById(graph, this.siteId, this.listId, this.itemId);
    } else if (this.groupId) {
      if (this.itemId) {
        driveItem = await getGroupDriveItemById(graph, this.groupId, this.itemId);
      } else if (this.itemPath) {
        driveItem = await getGroupDriveItemByPath(graph, this.groupId, this.itemPath);
      }
    } else if (this.insightType) {
      if (this.userId) {
        driveItem = await getUserInsightsDriveItemById(graph, this.userId, this.insightType, this.insightId);
      } else {
        driveItem = await getMyInsightsDriveItemById(graph, this.insightType, this.insightId);
      }
    }

    this.driveItem = driveItem;
  }

  private getFileTypeIcon() {
    return;
    // todo: graph call to get file type
    // determine which icon to render based on file type
  }

  private getTextFromProperty(driveItem: DriveItem, properties: string) {
    if (!properties || properties.length === 0) {
      return null;
    }

    const propertyList = properties.trim().split(',');
    let text;
    let i = 0;

    // convert date time
    const lastModifiedDateTime = new Date(driveItem.lastModifiedDateTime);
    const relativeDateString = getRelativeDisplayDate(lastModifiedDateTime);

    // convert size to mb
    const sizeInMb = (driveItem.size / (1024 * 1024)).toFixed(2);

    while (!text && i < propertyList.length) {
      const current = propertyList[i].trim();
      switch (current) {
        case 'size':
          text = `Size: ${sizeInMb}MB`;
          break;
        case 'lastModifiedDateTime':
          text = `Modified ${relativeDateString}`;
          break;
        default:
          text = driveItem[current];
      }
      i++;
    }

    return text;
  }
}
