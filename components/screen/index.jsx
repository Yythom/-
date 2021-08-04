/**
 * list: [{key: '', name: ''}]筛选列表
 * sort: 1, -1, 0;正序/倒序/
 * index: 当前排序字段index
 */
import React, { memo, useCallback } from 'react';
import { View, Navigator, Text, Input } from '@tarojs/components';
import { navLinkTo } from '@/common/publicFunc';
import './style.scss'

const Screen = memo(({ list, sort = 1, index = 0, cbScreen }) => {

  const handleScreenClick = (i) => {
    if (i === index) {
      cbScreen({ sort: sort === 1 ? -1 : 1, index: i })
    } else {
      cbScreen({ sort: 1, index: i })
    }
  }

  return (
    <View className='fb screen'>
      {
        list.map((cate, i) => (
          <Text
            key={cate.key} className={['item', index === i ? 'item-active' : ''].join(' ')}
            onClick={() => handleScreenClick(i)}
          >
            {cate.name}
            {
              index === i ? (sort === 1
                ? <Text className='iconfont icon-fold' />
                : sort === -1
                  ? <Text className='iconfont icon-unfold' />
                  : null) : <Text className='iconfont icon-unfold' />
            }

          </Text>
        ))
      }
    </View>
  )
})

export default Screen;