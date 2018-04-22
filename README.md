# mq-Structure

## Instalation

```
npm install @itavy/mq-structure
```

## API
## Classes

<dl>
<dt><a href="#MQMessage">MQMessage</a></dt>
<dd><p>MQMessage factory class</p>
</dd>
<dt><a href="#MQSerializer">MQSerializer</a></dt>
<dd><p>MQSerializer class</p>
</dd>
</dl>

## Objects

<dl>
<dt><a href="#itavy/mq-structure">itavy/mq-structure</a> : <code>object</code></dt>
<dd></dd>
</dl>

<a name="MQMessage"></a>

## MQMessage
MQMessage factory class

**Kind**: global class  

* [MQMessage](#MQMessage)
    * [.fromSync(request, [version])](#MQMessage.fromSync) ⇒ <code>MQMessageV1</code>
    * [.from(request, [version])](#MQMessage.from) ⇒ <code>Promise.&lt;MQMessageV1&gt;</code>
    * [.setPBSerializer([sourceIdentifier])](#MQMessage.setPBSerializer) ⇒ <code>undefined</code>

<a name="MQMessage.fromSync"></a>

### MQMessage.fromSync(request, [version]) ⇒ <code>MQMessageV1</code>
create mq message from a buffer or from an object

**Kind**: static method of [<code>MQMessage</code>](#MQMessage)  
**Returns**: <code>MQMessageV1</code> - mq message  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| request | <code>Buffer</code> \| <code>Object</code> |  | request to be decoded |
| [version] | <code>Object</code> | <code>MQMessageV1</code> | class instance for building request |

<a name="MQMessage.from"></a>

### MQMessage.from(request, [version]) ⇒ <code>Promise.&lt;MQMessageV1&gt;</code>
create mq message from a buffer or from an object

**Kind**: static method of [<code>MQMessage</code>](#MQMessage)  
**Returns**: <code>Promise.&lt;MQMessageV1&gt;</code> - resolves with decoded message  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| request | <code>Buffer</code> \| <code>Object</code> |  | request to be decoded |
| [version] | <code>String</code> | <code>1</code> | version for creating mq message |

<a name="MQMessage.setPBSerializer"></a>

### MQMessage.setPBSerializer([sourceIdentifier]) ⇒ <code>undefined</code>
set Protobuf singleton serializer

**Kind**: static method of [<code>MQMessage</code>](#MQMessage)  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [sourceIdentifier] | <code>String</code> | <code>&#x27;itavy.mq-structure&#x27;</code> | sourceIdentifier |

<a name="MQSerializer"></a>

## MQSerializer
MQSerializer class

**Kind**: global class  

* [MQSerializer](#MQSerializer)
    * [new MQSerializer(serializationSchema)](#new_MQSerializer_new)
    * [.serialize(request, [version])](#MQSerializer+serialize) ⇒ <code>Promise.&lt;Buffer&gt;</code>
    * [.serializeSync(request, [version])](#MQSerializer+serializeSync) ⇒ <code>Buffer</code>
    * [.unserialize(request)](#MQSerializer+unserialize) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.unserializeSync(request)](#MQSerializer+unserializeSync) ⇒ <code>Object</code>

<a name="new_MQSerializer_new"></a>

### new MQSerializer(serializationSchema)

| Param | Type | Description |
| --- | --- | --- |
| serializationSchema | <code>Object</code> | serializationSchema |

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

<a name="MQSerializer+serializeSync"></a>

### mqSerializer.serializeSync(request, [version]) ⇒ <code>Buffer</code>
Serialize a structure request

**Kind**: instance method of [<code>MQSerializer</code>](#MQSerializer)  
**Returns**: <code>Buffer</code> - resolves with serialized message  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| request | <code>Object</code> |  | message to be serialized |
| [version] | <code>String</code> | <code>&#x27;1&#x27;</code> | default version for serializing message |

<a name="MQSerializer+unserialize"></a>

### mqSerializer.unserialize(request) ⇒ <code>Promise.&lt;Object&gt;</code>
Promisified unserialize

**Kind**: instance method of [<code>MQSerializer</code>](#MQSerializer)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - resolves with unserialized message  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| request | <code>Buffer</code> | message to be unserialized |

<a name="MQSerializer+unserializeSync"></a>

### mqSerializer.unserializeSync(request) ⇒ <code>Object</code>
Unserialize synchronous

**Kind**: instance method of [<code>MQSerializer</code>](#MQSerializer)  
**Returns**: <code>Object</code> - unserialized message  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| request | <code>Buffer</code> | message to be unserialized |

<a name="itavy/mq-structure"></a>

## itavy/mq-structure : <code>object</code>
**Kind**: global namespace  

## TODO

* Examples

## LICENSE

[MIT](https://github.com/itavy/mq-structure/blob/master/LICENSE.md)
