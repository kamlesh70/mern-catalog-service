export type PriceType = 'base' | 'additional';
export type WidgetType = 'radio' | 'switch';

export enum PriceTypeEnum {
  base = 'base',
  additional = 'additional'
}

export enum WidgetTypeEnum {
  radio = 'radio',
  switch ='switch'
}

export interface IPriceConfiguration {
  [key: string] : {
    priceType: PriceType;
    defaultValue: string;
    availableOptions: string[];
  }
}

export interface IAttribute{
  name: string;
  widgetType: WidgetType;
  defaultValue: string;
  availableOptions: string[];
}

export interface ICategory {
  name: string;
  priceConfiguration: IPriceConfiguration;
  attributes: IAttribute;
}