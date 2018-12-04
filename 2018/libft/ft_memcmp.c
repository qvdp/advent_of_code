/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_memcmp.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: qvan-der <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/11/12 18:58:35 by qvan-der          #+#    #+#             */
/*   Updated: 2018/11/12 20:39:27 by qvan-der         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <string.h>

int					ft_memcmp(const void *s1, const void *s2, size_t n)
{
	unsigned char	*s1_copy;
	unsigned char	*s2_copy;
	size_t			i;

	s1_copy = (unsigned char*)s1;
	s2_copy = (unsigned char*)s2;
	i = 0;
	while (i < n && s1_copy[i] == s2_copy[i])
		i++;
	if (i == n)
		return (0);
	return (s1_copy[i] - s2_copy[i]);
}
