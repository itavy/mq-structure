# mq-Structure

## Instalation

```
npm install @itavy/mq-structure
```

## Quick Example

#### TODO

## API
## Classes

<dl>
<dt><a href="#MQSerializer">MQSerializer</a></dt>
<dd><p>MQSerializer class</p>
</dd>
</dl>

## Objects

<dl>
<dt><a href="#itavy/mq-structure">itavy/mq-structure</a> : <code>object</code></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#getSerializer">getSerializer(options)</a> ⇒ <code>MqSerializer</code></dt>
<dd><p>Serializer for MqMessage</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#SerializerOptions">SerializerOptions</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="MQSerializer"></a>

## MQSerializer
MQSerializer class

**Kind**: global class  

* [MQSerializer](#MQSerializer)
    * [new MQSerializer(di)](#new_MQSerializer_new)
    * [.serialize(request, [version])](#MQSerializer+serialize) ⇒ <code>Promise.&lt;Buffer&gt;</code>
    * [.unserialize(request)](#MQSerializer+unserialize) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getUnserializer(request)](#MQSerializer+getUnserializer) ⇒ <code>Promise.&lt;Object&gt;</code>

<a name="new_MQSerializer_new"></a>

### new MQSerializer(di)

| Param | Type | Description |
| --- | --- | --- |
| di | <code>Object</code> | required dependencies for serializer |

<a name="MQSerializer+serialize"></a>

### mqSerializer.serialize(request, [version]) ⇒ <code>Promise.&lt;Buffer&gt;</code>
Serialize a structure request

**Kind**: instance method of [<code>MQSerializer</code>](#MQSerializer)  
**Returns**: <code>Promise.&lt;Buffer&gt;</code> - resolves with serialized message  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| request | <code>Object</code> |  | message to be serialized |
| [version] | <code>String</code> | <code>&#x27;1&#x27;</code> | default version for serializing message |

<a name="MQSerializer+unserialize"></a>

### mqSerializer.unserialize(request) ⇒ <code>Promise.&lt;Object&gt;</code>
Serialize a structure request

**Kind**: instance method of [<code>MQSerializer</code>](#MQSerializer)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - resolves with unserialized message  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| request | <code>Buffer</code> | message to be unserialized serialized |

<a name="MQSerializer+getUnserializer"></a>

### mqSerializer.getUnserializer(request) ⇒ <code>Promise.&lt;Object&gt;</code>
get unserializer to decode request

**Kind**: instance method of [<code>MQSerializer</code>](#MQSerializer)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - resolves with serializer for full message  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| request | <code>Buffer</code> | message to be unserialized |

<a name="itavy/mq-structure"></a>

## itavy/mq-structure : <code>object</code>
**Kind**: global namespace  

* [itavy/mq-structure](#itavy/mq-structure) : <code>object</code>
    * [.MQMessage](#itavy/mq-structure.MQMessage)
        * [new MQMessage(options)](#new_itavy/mq-structure.MQMessage_new)
        * [.id](#itavy/mq-structure.MQMessage+id) : <code>String</code>
        * [.replyTo](#itavy/mq-structure.MQMessage+replyTo) : <code>String</code>
        * [.replyOn](#itavy/mq-structure.MQMessage+replyOn) : <code>String</code>
        * [.from](#itavy/mq-structure.MQMessage+from) : <code>String</code>
        * [.to](#itavy/mq-structure.MQMessage+to) : <code>String</code>
        * [.rs](#itavy/mq-structure.MQMessage+rs) : <code>String</code>
        * [.message](#itavy/mq-structure.MQMessage+message) : <code>Buffer</code>
        * [.toJSON()](#itavy/mq-structure.MQMessage+toJSON) ⇒ <code>Object</code>

<a name="itavy/mq-structure.MQMessage"></a>

### itavy/mq-structure.MQMessage
MQMessage structure

**Kind**: static class of [<code>itavy/mq-structure</code>](#itavy/mq-structure)  

* [.MQMessage](#itavy/mq-structure.MQMessage)
    * [new MQMessage(options)](#new_itavy/mq-structure.MQMessage_new)
    * [.id](#itavy/mq-structure.MQMessage+id) : <code>String</code>
    * [.replyTo](#itavy/mq-structure.MQMessage+replyTo) : <code>String</code>
    * [.replyOn](#itavy/mq-structure.MQMessage+replyOn) : <code>String</code>
    * [.from](#itavy/mq-structure.MQMessage+from) : <code>String</code>
    * [.to](#itavy/mq-structure.MQMessage+to) : <code>String</code>
    * [.rs](#itavy/mq-structure.MQMessage+rs) : <code>String</code>
    * [.message](#itavy/mq-structure.MQMessage+message) : <code>Buffer</code>
    * [.toJSON()](#itavy/mq-structure.MQMessage+toJSON) ⇒ <code>Object</code>

<a name="new_itavy/mq-structure.MQMessage_new"></a>

#### new MQMessage(options)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | mq message info |

<a name="itavy/mq-structure.MQMessage+id"></a>

#### mqMessage.id : <code>String</code>
message id

**Kind**: instance property of [<code>MQMessage</code>](#itavy/mq-structure.MQMessage)  
<a name="itavy/mq-structure.MQMessage+replyTo"></a>

#### mqMessage.replyTo : <code>String</code>
to who it shall reply

**Kind**: instance property of [<code>MQMessage</code>](#itavy/mq-structure.MQMessage)  
<a name="itavy/mq-structure.MQMessage+replyOn"></a>

#### mqMessage.replyOn : <code>String</code>
where it shall reply

**Kind**: instance property of [<code>MQMessage</code>](#itavy/mq-structure.MQMessage)  
<a name="itavy/mq-structure.MQMessage+from"></a>

#### mqMessage.from : <code>String</code>
who sent it

**Kind**: instance property of [<code>MQMessage</code>](#itavy/mq-structure.MQMessage)  
<a name="itavy/mq-structure.MQMessage+to"></a>

#### mqMessage.to : <code>String</code>
to who is this message for

**Kind**: instance property of [<code>MQMessage</code>](#itavy/mq-structure.MQMessage)  
<a name="itavy/mq-structure.MQMessage+rs"></a>

#### mqMessage.rs : <code>String</code>
timestamp (in miliseconds) of this message

**Kind**: instance property of [<code>MQMessage</code>](#itavy/mq-structure.MQMessage)  
**Default**: <code>Date.now(),</code>  
<a name="itavy/mq-structure.MQMessage+message"></a>

#### mqMessage.message : <code>Buffer</code>
message to be sent

**Kind**: instance property of [<code>MQMessage</code>](#itavy/mq-structure.MQMessage)  
<a name="itavy/mq-structure.MQMessage+toJSON"></a>

#### mqMessage.toJSON() ⇒ <code>Object</code>
get literal representation of the message

**Kind**: instance method of [<code>MQMessage</code>](#itavy/mq-structure.MQMessage)  
**Returns**: <code>Object</code> - literal representation of MQMessage  
<a name="getSerializer"></a>

## getSerializer(options) ⇒ <code>MqSerializer</code>
Serializer for MqMessage

**Kind**: global function  
**Returns**: <code>MqSerializer</code> - serializer for MqMessage  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| options | [<code>SerializerOptions</code>](#SerializerOptions) | serializer options |

<a name="SerializerOptions"></a>

## SerializerOptions : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| debugTag | <code>String</code> | <code>&#x27;&#x27;</code> | prefix for debugging purpose |
| sourceIdentifier | <code>String</code> | <code>&#x27;&#x27;</code> | prefix for errors source |


## Usage

#### TODO
<!--
see [Example](https://github.com/itavy/mq-structure/blob/master/examples/example.js)
-->

## LICENSE

[MIT](https://github.com/itavy/mq-structure/blob/master/LICENSE.md)
